const express = require('express');
const router = express.Router({ mergeParams: true });
const mongoose = require('mongoose');
const Post = mongoose.model('Post');
const Comment = mongoose.model('Comment');
const { requireUser } = require('../../config/passport');
const validateCommentInput = require('../../validations/posts.js');

// GET all comments for a specific post
router.get('/', async (req, res, next) => {
    try {
      const comments = await Comment.find({ post: req.params.postId })
        .populate('author', '_id username')
        .sort({ createdAt: -1 });
        return res.json(comments);
        // const formattedComments = comments.map((comment) => ({
        //     ...comment.toObject(),
        //     user_id: comment.author._id,
        //     username: comment.author.username,
        // }));
  
    //   return res.json(formattedComments);
    } catch (err) {
      next(err);
    }
  });


// POST create a new comment for a specific post
router.post('/', requireUser, validateCommentInput, async (req, res, next) => {
    try {
      const post = await Post.findOne({_id: req.params.postId});
      if (!post) {
        const error = new Error('Post not found');
        error.statusCode = 404;
        error.errors = { message: 'No post found with that id' };
        return next(error);
      }
  
      const newComment = new Comment({
        text: req.body.text,
        author: req.user._id,
        post: post._id,
      });
  
      let comment = await newComment.save();
      comment = await Comment.populate(comment, {path: 'author', select: '_id username'});
  
      // Add the new comment to the post's comments array
      post.comments.push(comment);
      await post.save();
  
      return res.json(comment);
    } catch (err) {
      next(err);
    }
  });
  
  

// GET a specific comment for a specific post
router.get('/:commentId', async (req, res, next) => {
  try {
    const comment = await Comment.findOne({
      _id: req.params.commentId,
      post: req.params.postId,
    }).populate('author', '_id username');

    if (!comment) {
      const error = new Error('Comment not found');
      error.statusCode = 404;
      error.errors = { message: 'No comment found with that id' };
      return next(error);
    }

    return res.json(comment);
  } catch (err) {
    next(err);
  }
});

// PATCH update a specific comment for a specific post
router.patch('/:commentId', requireUser, validateCommentInput, async (req, res, next) => {
  try {
    // Note: You may need to adjust the model name and field names depending on your actual schema.
    const comment = await Comment.findOne({
      _id: req.params.commentId,
      post: req.params.postId,
    }).populate('author', '_id username'); // Populate the author field

    if (!comment) {
      const error = new Error('Comment not found');
      error.statusCode = 404;
      error.errors = { message: 'No comment found with that id' };
      return next(error);
    }

    // Check if the authenticated user is the author of the comment
    if (comment.author._id.toString() !== req.user._id.toString()) {
      const error = new Error('Unauthorized');
      error.statusCode = 401;
      error.errors = { message: 'You are not authorized to edit this comment' };
      return next(error);
    }

    // Update the comment with the new text
    comment.text = req.body.text;
    const updatedComment = await comment.save();

    return res.json(updatedComment);
  } catch (err) {
    next(err);
  }
});


// DELETE a specific comment for a specific post
router.delete('/:commentId', requireUser, async (req, res, next) => {
    try {
      const comment = await Comment.findOne({
        _id: req.params.commentId,
        post: req.params.postId,
      });
  
      if (!comment) {
        const error = new Error('Comment not found');
        error.statusCode = 404;
        error.errors = { message: 'No comment found with that id' };
        return next(error);
      }
  
      // Check if the authenticated user is the author of the comment
      if (comment.author.toString() !== req.user._id.toString()) {
        const error = new Error('Unauthorized');
        error.statusCode = 401;
        error.errors = { message: 'You are not authorized to delete this comment' };
        return next(error);
      }
  
      await Comment.deleteOne({ _id: comment._id });
  
      return res.json({ success: true });
    } catch (err) {
      next(err);
    }
  });
  
  

// Like a comment
router.post('/:commentId/like', requireUser, async (req, res, next) => {
    try {
      const comment = await Comment.findById(req.params.commentId);
  
      if (!comment) {
        throw new Error('Comment not found');
      }
  
      if (comment.likes.includes(req.user._id)) {
        throw new Error('User has already liked this comment');
      }
  
      comment.likes.push(req.user._id);
      await comment.save();
  
      return res.json(comment);
    } catch (err) {
      next(err);
    }
  });
  
  // Unlike a comment
  router.post('/:commentId/unlike', requireUser, async (req, res, next) => {
    try {
      const comment = await Comment.findById(req.params.commentId);
  
      if (!comment) {
        throw new Error('Comment not found');
      }
  
      const likeIndex = comment.likes.indexOf(req.user._id);
  
      if (likeIndex === -1) {
        throw new Error('User has not liked this comment');
      }
  
      comment.likes.splice(likeIndex, 1);
      await comment.save();
  
      return res.json(comment);
    } catch (err) {
      next(err);
    }
  });
  

module.exports = router;
