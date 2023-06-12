const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');
const Post = require('../models/Post');
const DEFAULT_PROFILE_IMAGE_URL ='https://kl-mern-twitter.s3.us-east-2.amazonaws.com/public/largeebirdbath.jpeg'

// Connect to database
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB successfully');
    initializeImages();
  })
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  });

// Initialize image fields in db
const initializeImages = async () => {
  console.log("Initializing profile avatars...");
  await User.updateMany({}, { profileImageUrl: DEFAULT_PROFILE_IMAGE_URL });

  console.log("Initializing Tweet image URLs...");
  await Post.updateMany({}, { imageUrls: [] });

  console.log("Done!");
  mongoose.disconnect();
}
