// routes/api/searches.js
const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');

router.get('/search', async (req, res) => {
  try {
    const query = req.query.q;
    const results = await Post.find({ text: { $regex: query, $options: 'i' } });
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Faileddddd to fetch search results' });
  }
});

module.exports = router;
