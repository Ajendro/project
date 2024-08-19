const express = require('express');
const router = express.Router();
const postControllers = require('../controllers/postControllers')

router.post('/createPost', postControllers.createPost);
router.post('/post', postControllers.getAllPosts);
router.post('/updatePost/:id', postControllers.updatePost);
router.post('/deletePost/:id', postControllers.deletePost);
router.post('/getPost/:id', postControllers.getPost);

module.exports=router;