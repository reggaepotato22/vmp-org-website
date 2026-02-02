const express = require('express');
const {
  getGalleries,
  getGallery,
  createGallery,
  updateGallery,
  deleteGallery
} = require('../controllers/galleryController');

const router = express.Router();

router
  .route('/')
  .get(getGalleries)
  .post(createGallery);

router
  .route('/:id')
  .get(getGallery)
  .put(updateGallery)
  .delete(deleteGallery);

module.exports = router;
