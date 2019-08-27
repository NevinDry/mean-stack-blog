const express = require('express');
const router = express.Router();

var blogController = require('../controllers/blog.controller');


//routes
router.get('/getLatest', blogController.getLatest);
router.get('/getAll', blogController.getAll);
router.get('/getOne/:id', blogController.getOne);

router.post('/addArticle', blogController.addArticle);
router.post('/editArticle/:id', blogController.editArticle);
router.post('/addComment/:id', blogController.addComment);

router.delete('/article/:id', blogController.deleteArticle);



module.exports = router;