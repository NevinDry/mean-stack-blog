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
            imageLink: form.imageLink
        }



        collection.insertOne(article, function (err, res) {
            if (err) reject(err);
            resolve(res.insertedId);
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
                    lastModified: new Date()
                },
            },
            function (err, res) {
                if (err) reject(err);
                console.log(res);
                resolve(id);
            });
    });
};