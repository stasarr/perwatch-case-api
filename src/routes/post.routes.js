const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');

router.get('/', postController.getPosts);
router.get('/user/:userId', postController.getPostsByUser);
router.get('/tag/:tag', postController.getPostsByTag);
router.get('/:id', postController.getPostById);
router.post('/', postController.createPost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);

module.exports = router;
