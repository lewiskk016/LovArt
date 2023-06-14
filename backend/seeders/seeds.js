const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');
const Post = require('../models/Post');
const bcrypt = require('bcryptjs');




const NUM_SEED_USERS = 10;
const NUM_SEED_POSTS = 30;


mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB successfully');
    insertSeeds();
  })
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  });

  const insertSeeds = () => {
    console.log("Resetting db and seeding users and posts...");
  
    User.collection.drop()
                   .then(() => Post.collection.drop())
                   .then(() => User.insertMany(users))
                   .then(() => Post.insertMany(posts))
                   .then(() => {
                     console.log("Done!");
                     mongoose.disconnect();
                   })
                   .catch(err => {
                     console.error(err.stack);
                     process.exit(1);
                   });
  }