var userWorker = require('../workers/user.worker');
var HttpResponses = require('../models/HttpResponses');

module.exports.login = function (req, res, next) {
    userWorker.login(req.body.name, req.body.password)
      .then(function (user) {
        if (user) {
          // authentication successful
          console.log(user);
          next(new HttpResponses.HttpSuccess(true, 200, 'Login Success', user));
        } else {
          // authentication failed
          next(new HttpResponses.HttpError('Incorrect name or password', null, 500));
        }
      })
      .catch(function (err) {
        next(new HttpResponses.HttpError('Error ', null, 500));
      });
  }