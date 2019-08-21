var blogWorker = require('../workers/blog.worker');
var HttpResponses = require('../models/HttpResponses');

module.exports.getLatest = function (req, res, next) {
    blogWorker.getLatest(req.query.index, req.query.search)
        .then((data) => {
            next(new HttpResponses.HttpSuccess(true, 200, 'Success', data));
        })
        .catch(err => {
            next(new HttpResponses.HttpError("Error while loading articles", err, 500));
        });

}

module.exports.getAll = function (req, res, next) {
    blogWorker.getAll()
        .then((data) => {
            next(new HttpResponses.HttpSuccess(true, 200, 'Success', data));
        })
        .catch(err => {
            next(new HttpResponses.HttpError("Error while loading articles", err, 500));
        });

}

module.exports.getOne = function (req, res, next) {
    blogWorker.getOne(req.param('id'))
        .then((data) => {
            next(new HttpResponses.HttpSuccess(true, 200, 'Article found', data));
        })
        .catch(err => {
            next(new HttpResponses.HttpError("Error while checking article", err, 500));
        });
}

module.exports.deleteArticle = function (req, res, next) {
    blogWorker.deleteArticle(req.param('id'))
        .then((data) => {
            next(new HttpResponses.HttpSuccess(true, 200, 'Article removed', data));
        })
        .catch(err => {
            next(new HttpResponses.HttpError("Error while removing article", err, 500));
        });

}

module.exports.addArticle = function (req, res, next) {
    blogWorker.addArticle(req, res)
        .then((data) => {
            next(new HttpResponses.HttpSuccess(true, 200, 'Successfully added', data));
        })
        .catch(err => {
            next(new HttpResponses.HttpError("Error while adding article", err, 500));
        });

}

module.exports.editArticle = function (req, res, next) {
    blogWorker.editArticle(req, res)
        .then((data) => {
            next(new HttpResponses.HttpSuccess(true, 200, 'Successfully edited', data));
        })
        .catch(err => {
            next(new HttpResponses.HttpError("Error while editing article", err, 500));
        });

}