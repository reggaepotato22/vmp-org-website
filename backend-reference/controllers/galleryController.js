const Gallery = require('../models/Gallery');

// @desc    Get all galleries
// @route   GET /api/galleries
// @access  Public
exports.getGalleries = async (req, res) => {
  try {
    const galleries = await Gallery.find().sort({ date: -1 });
    res.status(200).json({ success: true, count: galleries.length, data: galleries });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Get single gallery
// @route   GET /api/galleries/:id
// @access  Public
exports.getGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);

    if (!gallery) {
      return res.status(404).json({ success: false, error: 'Gallery not found' });
    }

    res.status(200).json({ success: true, data: gallery });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Create new gallery
// @route   POST /api/galleries
// @access  Private
exports.createGallery = async (req, res) => {
  try {
    const gallery = await Gallery.create(req.body);
    res.status(201).json({ success: true, data: gallery });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({ success: false, error: messages });
    }
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Update gallery
// @route   PUT /api/galleries/:id
// @access  Private
exports.updateGallery = async (req, res) => {
  try {
    let gallery = await Gallery.findById(req.params.id);

    if (!gallery) {
      return res.status(404).json({ success: false, error: 'Gallery not found' });
    }

    gallery = await Gallery.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ success: true, data: gallery });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Delete gallery
// @route   DELETE /api/galleries/:id
// @access  Private
exports.deleteGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);

    if (!gallery) {
      return res.status(404).json({ success: false, error: 'Gallery not found' });
    }

    await gallery.deleteOne();

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};
