const express = require('express');
const router = express.Router();
var multer = require('multer');
var uuidv4 = require('../helpers/generators');
var HttpResponses = require('../models/HttpResponses');
let fs = require('fs-extra');

//GENERIC UPLOAD ROUTE

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let path = `media/uploads/${req.params.type}`;
        fs.mkdirsSync(path);
        cb(null, path);
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4() + '.jpg')
    }
});

var upload = multer({ storage: storage }).single('file');

//routes
router.post('/uploadImage/:type', function (req, res, next) {
    var path = '';
    upload(req, res, function (err) { 
        if (err || typeof req.file === 'undefined') {
            next(new HttpResponses.HttpError("Erreur lors de l'upload", err, 500));
        }else{
            path = req.file.filename;
            next(new HttpResponses.HttpSuccess(true, 200, 'Upload Success', path));
        } 
    });
});

module.exports = router;