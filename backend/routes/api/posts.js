const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Post = mongoose.model('Post');
const { requireUser } = require('../../config/passport');
const validatePostInput = require('../../validations/posts.js');

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
                              .populate("author", "_id username profileImageUrl")
                              .sort({ createdAt: -1 });
    return res.json(posts);
  }
  catch(err) {
    return res.json([]);
  }
});

router.get('/user/:userId', async (req, res, next) => {
  let user;
  try {
    user = await User.findById(req.params.userId);
  } catch(err) {
    const error = new Error('User not found');
    error.statusCode = 404;
    error.errors = { message: "No user found with that id" };
    return next(error);
  }
  try {
    const posts = await Post.find({ author: user._id })
    .sort({ createdAt: -1 })
    .populate("author", "_id username profileImageUrl");
    return res.json(posts);
  }
  catch(err) {
    return res.json([]);
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("author", "_id username profileImageUrl");
    return res.json(post);
  }
  catch(err) {
    const error = new Error('Post not found');
    error.statusCode = 404;
    error.errors = { message: "No post found with that id" };
    return next(error);
  }
});

router.post('/', requireUser, validatePostInput, async (req, res, next) => {
  try {
    const newPost = new Post({
      text: req.body.text,
      author: req.user._id
    });

    let post = await newPost.save();
    post = await post.populate('author', "_id username profileImageUrl");
    return res.json(post);
  }
  catch(err) {
    next(err);
  }
});

router.patch('/:id', requireUser, validatePostInput, async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      const error = new Error('Post not found');
      error.statusCode = 404;
      error.errors = { message: "No post found with that id" };
      return next(error);
    }

    // Check if the authenticated user is the author of the post
    if (post.author.toString() !== req.user._id.toString()) {
      const error = new Error('Unauthorized');
      error.statusCode = 401;
      error.errors = { message: "You are not authorized to edit this post" };
      return next(error);
    }

    // Update the post with the new text
    post.text = req.body.text;
    const updatedPost = await post.save();

    return res.json(updatedPost);
  }
  catch (err) {
    next(err);
  }
});

router.delete('/:id', requireUser, async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      const error = new Error('Post not found');
      error.statusCode = 404;
      error.errors = { message: "No post found with that id" };
      return next(error);
    }

    // Check if the authenticated user is the author of the post
    if (post.author.toString() !== req.user._id.toString()) {
      const error = new Error('Unauthorized');
      error.statusCode = 401;
      error.errors = { message: "You are not authorized to delete this post" };
      return next(error);
    }

    await Post.deleteOne({ _id: post._id });

    return res.json({ success: true });
  }
  catch (err) {
    next(err);
  }
});


module.exports = router;
