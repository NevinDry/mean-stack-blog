'use strict';
var db = require('../db')
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config.json');

module.exports.login = function (name, password) {
    return new Promise(function (resolve, reject) {
        db.get().collection('users').findOne({ name: name }, (error, user) => {
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
