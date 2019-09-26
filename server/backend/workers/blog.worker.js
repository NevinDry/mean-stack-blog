'use strict';
var db = require('../db');
var ObjectID = require('mongodb').ObjectID;

module.exports.getLatest = function (index, search) {
    return new Promise(function (resolve, reject) {
        var collection = db.get().collection('articles');
        let searchQuery = {};
        if (search.length != 0) {
            searchQuery = {
                $or: [{
                    title: {
                        $regex: ".*" + search + ".*",
                        "$options": "i"
                    }
                }, {
                    preview: {
                        $regex: ".*" + search + ".*",
                        "$options": "i"
                    }
                }, {
                    author: {
                        $regex: ".*" + search + ".*",
                        "$options": "i"
                    }
                }]
            };
        };

        collection.find(searchQuery)
            .sort({
                "date": -1
            })
            .skip(parseInt(index))
            .limit(3).toArray(function (err, docs) {
                if (err) {
                    reject(err);
                }
                resolve(docs);
            });
    })
};

module.exports.getAll = function () {
    return new Promise(function (resolve, reject) {
        var collection = db.get().collection('articles');
        collection.find()
            .sort({
                "date": -1
            })
            .toArray(function (err, docs) {
                if (err) {
                    reject(err);
                }
                resolve(docs);
            });
    })
};

module.exports.getOne = function (id) {
    return new Promise(function (resolve, reject) {
        var collection = db.get().collection('articles');
        collection.findOne({
            _id: new ObjectID(id)
        }, function (err, doc) {
            if (err) {
                reject(err);
            }
            resolve(doc);
        });

        // agregate to sort comments backend
        // collection.aggregate([{
        //         '$match': {
        //             '_id': new ObjectID(id)
        //         }
        //     },
        //     {
        //         $unwind: '$comments'
        //     },
        //     {
        //         '$sort': {
        //             'comments.date': -1
        //         }
        //     },
        //     {
        //         $group: {
        //             _id: '$_id',
        //             'comments': {
        //                 $push: '$comments'
        //             }
        //         }
        //     }
        // ]).toArray(function (err, docs) {
        //     if (err) {
        //         reject(err);
        //     }
        //     console.log(docs[0]);
        //     resolve(docs[0]);
        // });

    })
};

module.exports.deleteArticle = function (id) {
    return new Promise(function (resolve, reject) {
        var collection = db.get().collection('articles');
        collection.deleteOne({
            _id: new ObjectID(id)
        }, function (err, doc) {
            if (err) {
                reject(err);
            }
            resolve(doc);
        });
    })
};



module.exports.addArticle = function (req, res) {
    return new Promise(function (resolve, reject) {
        var collection = db.get().collection('articles');

        const form = req.body;
        const article = {
            title: form.title,
            preview: form.preview,
            content: form.content,
            date: new Date(),
            readingTime: form.time,
            author: req.user.name,
            imageLink: form.imageLink,
            imagesContent: form.imagesContent
        }



        collection.insertOne(article, function (err, res) {
            if (err) reject(err);
            resolve(res.insertedId);
        });
    });
};

module.exports.addComment = function (req, res) {
    return new Promise(function (resolve, reject) {
        var collection = db.get().collection('articles');

        const comment = {
            author: req.body.author || 'Anonymous',
            comment: req.body.comment,
            date: new Date()
        }
        const id = req.params.id;

        collection.updateOne({
                _id: ObjectID(id)
            }, {
                $push: {
                    comments: comment
                },
            },
            function (err, res) {
                if (err) reject(err);
                resolve(comment);
            });
    });
};

module.exports.editArticle = function (req, res) {
    return new Promise(function (resolve, reject) {
        var collection = db.get().collection('articles');

        const form = req.body;
        const id = req.params.id;
        collection.updateOne({
                _id: ObjectID(id)
            }, {
                $set: {
                    title: form.title,
                    preview: form.preview,
                    content: form.content,
                    readingTime: form.time,
                    imageLink: form.imageLink,
                    imagesContent: form.imagesContent,
                    lastModified: new Date()
                },
            },
            function (err, res) {
                if (err) reject(err);
                resolve(id);
            });
    });
};