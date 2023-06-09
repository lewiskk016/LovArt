const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Post = mongoose.model('Post');
const { requireUser } = require('../../config/passport');
const validatePostInput = require('../../validations/posts.js');
const { multipleFilesUpload, multipleMulterUpload } = require("../../awsS3");

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
      .populate({
        path: 'author', // Add this line to populate the post author
        select: '_id username profileImageUrl', // Select the fields you want to populate
      })
      .populate({
        path: 'comments',
        options: { sort: { createdAt: -1 }, limit: 2 },
        populate: {
          path: 'author',
          select: '_id username profileImageUrl',
        },
      })
      .sort({ createdAt: -1 });

    const formattedPosts = posts.map((post) => ({
      _id: post._id,
      author: post.author,
      imageUrls: post.imageUrls,
      text: post.text,
      commentCount: post.comments.length,
      likeCount: post.likes.length,
      lastTwoComments: post.comments.map((comment) => ({
        _id: comment._id,
        text: comment.text,
        author: comment.author,
        authorId: comment.author.id
      })),
      likes: post.likes,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    }));

    return res.json(formattedPosts);
  } catch (err) {
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

router.post('/', multipleMulterUpload("images"), requireUser, validatePostInput, async (req, res, next) => {
  const imageUrls = await multipleFilesUpload({ files: req.files, public: true });
  try {
    const newPost = new Post({
      text: req.body.text,
      imageUrls,
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
    await post.save();

    // Re-fetch the post from the database with the necessary populated fields
    const updatedPost = await Post.findById(req.params.id)
      .populate({
        path: 'comments',
        options: { sort: { createdAt: -1 }, limit: 2 },
        populate: {
          path: 'author',
          select: '_id username profileImageUrl',
        },
      })
      .populate('author', '_id username profileImageUrl');

    const formattedPost = {
      _id: updatedPost._id,
      author: updatedPost.author,
      imageUrls: updatedPost.imageUrls,
      text: updatedPost.text,
      commentCount: updatedPost.comments.length,
      likeCount: updatedPost.likes.length,
      lastTwoComments: updatedPost.comments.map((comment) => ({
        _id: comment._id,
        text: comment.text,
        author: comment.author,
        authorId: comment.author.id
      })),
      likes: updatedPost.likes,
      createdAt: updatedPost.createdAt,
      updatedAt: updatedPost.updatedAt,
    };

    return res.json(formattedPost);
  } catch (err) {
    // console.log(err, "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
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

// Like a post
router.post('/:postId/like', requireUser, async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      throw new Error('Post not found');
    }

    const userId = req.user._id.toString();

    if (post.likes.includes(userId)) {
      throw new Error('User has already liked this post');
    }

    post.likes.push(userId);
    await post.save();

    return res.json(post);
  } catch (err) {
    next(err);
  }
});


// Unlike a post
// Unlike a post
router.post('/:postId/unlike', requireUser, async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      throw new Error('Post not found');
    }

    const userId = req.user._id.toString();

    if (!post.likes.includes(userId)) {
      throw new Error('User has not liked this post');
    }

    post.likes.pull(userId);
    await post.save();

    return res.json(post);
  } catch (err) {
    next(err);
  }
});


// Similar endpoints can be created for comments as well.



module.exports = router;
