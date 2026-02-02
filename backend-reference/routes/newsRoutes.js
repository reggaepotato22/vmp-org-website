const express = require('express');
const {
  getNews,
  getNewsStory,
  createNews,
  updateNews,
  deleteNews
} = require('../controllers/newsController');

const router = express.Router();

router
  .route('/')
  .get(getNews)
  .post(createNews);

router
  .route('/:id')
  .get(getNewsStory)
  .put(updateNews)
  .delete(deleteNews);

module.exports = router;
