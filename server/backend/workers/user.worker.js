'use strict';
var db = require('../db')
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config.json');
var ObjectID = require('mongodb').ObjectID;

module.exports.login = function (name, password) {
    return new Promise(function (resolve, reject) {
        db.get().collection('users').findOne({
            name: name
        }, (error, user) => {
            if (error) reject(error);

            if (user && bcrypt.compareSync(password, user.hash)) {
                // authentication successful
                var date = new Date();
                date.setMonth(date.getMonth() + 1);
                resolve({
                    _id: user._id,
                    name: user.name,
                    exp: date.getTime(),
                    token: jwt.sign({
                        _id: user._id,
                        name: user.name,
                    }, config.secret, {
                        expiresIn: 60 * 43800
                    })
                });
            } else {
                // authentication failed
                resolve();
            }
        });
    });
};

module.exports.getAuhtorForArticle = function (id) {
    return new Promise((resolve, reject) => {
        var collection = db.get().collection('users');
        collection.findOne({
            _id: new ObjectID(id)
        }, (error, user) => {
            if (error) reject(error);
            if (user) {
                resolve({
                    name: user.name,
                    link: user.link,
                    twitter: user.twitter,
                    lead: user.lead
                });
            } else {
                reject("No user found");
            }

        });
    });
}