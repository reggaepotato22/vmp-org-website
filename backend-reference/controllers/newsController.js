const News = require('../models/News');

// @desc    Get all news
// @route   GET /api/news
// @access  Public
exports.getNews = async (req, res) => {
  try {
    const news = await News.find().sort({ publishedAt: -1 });
    res.status(200).json({ success: true, count: news.length, data: news });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Get single news story
// @route   GET /api/news/:id
// @access  Public
exports.getNewsStory = async (req, res) => {
  try {
    const newsStory = await News.findById(req.params.id);

    if (!newsStory) {
      return res.status(404).json({ success: false, error: 'News story not found' });
    }

    res.status(200).json({ success: true, data: newsStory });
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ success: false, error: 'News story not found' });
    }
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Create new news story
// @route   POST /api/news
// @access  Private
exports.createNews = async (req, res) => {
  try {
    const newsStory = await News.create(req.body);
    res.status(201).json({ success: true, data: newsStory });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({ success: false, error: messages });
    }
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Update news story
// @route   PUT /api/news/:id
// @access  Private
exports.updateNews = async (req, res) => {
  try {
    let newsStory = await News.findById(req.params.id);

    if (!newsStory) {
      return res.status(404).json({ success: false, error: 'News story not found' });
    }

    newsStory = await News.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ success: true, data: newsStory });
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ success: false, error: 'News story not found' });
    }
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Delete news story
// @route   DELETE /api/news/:id
// @access  Private
exports.deleteNews = async (req, res) => {
  try {
    const newsStory = await News.findById(req.params.id);

    if (!newsStory) {
      return res.status(404).json({ success: false, error: 'News story not found' });
    }

    await newsStory.deleteOne();

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ success: false, error: 'News story not found' });
    }
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};
