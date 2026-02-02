const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  imageUrl: {
    type: String,
    required: true // Featured image
  },
  body: {
    type: String,
    required: true // Rich text content
  },
  excerpt: {
    type: String,
    required: true // Short summary for cards
  },
  author: {
    type: String,
    default: "Admin"
  },
  publishedAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Draft', 'Published', 'Archived'],
    default: 'Draft'
  },
  category: {
    type: String,
    enum: ['Mission Report', 'Partnership', 'Milestone', 'Event', 'General'],
    default: 'General'
  },
  readTime: {
    type: String // e.g., "5 min read"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('News', NewsSchema);
