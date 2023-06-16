const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Post = mongoose.model('Post');
const passport = require('passport');
const { loginUser, restoreUser, requireUser } = require('../../config/passport');
const { isProduction } = require('../../config/keys');
const { singleFileUpload, singleMulterUpload } = require("../../awsS3");
const validateRegisterInput = require('../../validations/register');
const validateLoginInput = require('../../validations/login');
const DEFAULT_PROFILE_IMAGE_URL ='https://kl-mern-twitter.s3.us-east-2.amazonaws.com/public/largeebirdbath.jpeg';


router.get('/current', restoreUser, (req, res) => {
  if (!isProduction) {
    // In development, allow React server to gain access to the CSRF token
    // whenever the current user information is first loaded into the
    // React application
    const csrfToken = req.csrfToken();
    res.cookie("CSRF-TOKEN", csrfToken);
  }
  if (!req.user) return res.json(null);
  res.json({
    _id: req.user._id,
    username: req.user.username,
    profileImageUrl: req.user.profileImageUrl,
    email: req.user.email
  });
});


router.post('/register', singleMulterUpload("image"), validateRegisterInput, async (req, res, next) => {
  // Check to make sure no one has already registered with the proposed email or
  // username.
  const user = await User.findOne({
    $or: [{ email: req.body.email }, { username: req.body.username }]
  });

  if (user) {
    // Throw a 400 error if the email address and/or username already exists
    const err = new Error("Validation Error");
    err.statusCode = 400;
    const errors = {};
    if (user.email === req.body.email) {
      errors.email = "A user has already registered with this email";
    }
    if (user.username === req.body.username) {
      errors.username = "A user has already registered with this username";
    }
    err.errors = errors;
    return next(err);
  }

  // Otherwise create a new user
  const profileImageUrl = req.file ?
      await singleFileUpload({ file: req.file, public: true }) :
      DEFAULT_PROFILE_IMAGE_URL;
  const newUser = new User({
    username: req.body.username,
    profileImageUrl,
    email: req.body.email
  });

  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(req.body.password, salt, async (err, hashedPassword) => {
      if (err) throw err;
      try {
        newUser.hashedPassword = hashedPassword;
        const user = await newUser.save();
        return res.json(await loginUser(user)); // <-- THIS IS THE CHANGED LINE
      }
      catch(err) {
        next(err);
      }
    })
  });
});


router.post('/', singleMulterUpload(""), validateLoginInput, async (req, res, next) => {
  passport.authenticate('local', async function(err, user) {
    if (err) return next(err);
    if (!user) {
      const err = new Error('Invalid credentials');
      err.statusCode = 400;
      err.errors = { email: "Invalid credentials" };
      return next(err);
    }
    return res.json(await loginUser(user));
  })(req, res, next);
});

router.get('/:userId/posts', async (req, res, next) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ author: userId })
      .sort({ createdAt: -1 })
      .populate("author", "_id username profileImageUrl");

    return res.json(posts);
  } catch (err) {
    next(err);
  }
});

// POST /api/users/:userId/follow
router.post('/:userId/follow', requireUser, async (req, res, next) => {
  try {
    const { userId } = req.params;
    const currentUser = await User.findById(req.user._id); // Assuming you have the authenticated user's ID

    // Check if the current user is already following the target user
    if (currentUser.following.includes(userId)) {
      return res.status(400).json({ message: 'User is already being followed' });
    }

    currentUser.following.push(userId);
    await currentUser.save();

    const targetUser = await User.findById(userId); // Find the target user
    targetUser.followers.push(currentUser._id); // Add the follower to the target user's followers array
    await targetUser.save();

    res.json({ message: 'User followed successfully' });
  } catch (err) {
    next(err);
  }
});


// POST /api/users/:userId/unfollow
router.post('/:userId/unfollow', requireUser, async (req, res, next) => {
  try {
    const { userId } = req.params;
    const currentUser = await User.findById(req.user._id); // Assuming you have the authenticated user's ID

    // Check if the current user is already not following the target user
    if (!currentUser.following.includes(userId)) {
      return res.status(400).json({ message: 'User is not being followed' });
    }

    // Remove the target user from the current user's following list
    currentUser.following = currentUser.following.filter((followedUserId) => followedUserId.toString() !== userId);
    await currentUser.save();

    const targetUser = await User.findById(userId); // Find the target user
    targetUser.followers = targetUser.followers.filter((followerId) => followerId.toString() !== currentUser._id.toString()); // Remove the current user from the target user's followers array
    await targetUser.save();

    res.json({ message: 'User unfollowed successfully' });
  } catch (err) {
    next(err);
  }
});


// GET /api/users/:userId/followers
router.get('/:userId/followers', async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate('followers', '_id username profileImageUrl');

    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      error.errors = { message: 'No user found with that id' };
      return next(error);
    }

    return res.json(user.followers);
  } catch (err) {
    next(err);
  }
});


module.exports = router;
