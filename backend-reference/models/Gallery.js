const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  coverImage: {
    type: String,
    required: true // URL of the thumbnail
  },
  type: {
    type: String,
    enum: ['internal', 'external'],
    required: true,
    default: 'internal'
  },
  // If type is 'external', this is required
  externalLink: {
    type: String,
    trim: true
  },
  // If type is 'internal', this contains the list of photo URLs
  internalImages: [{
    type: String
  }],
  category: {
    type: String,
    default: 'General'
  },
  description: {
    type: String
  },
  missionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mission',
    required: false
  },
  date: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Validation to ensure externalLink is present if type is external
GallerySchema.pre('save', function(next) {
  if (this.type === 'external' && !this.externalLink) {
    next(new Error('External link is required for external galleries'));
  } else {
    next();
  }
});

module.exports = mongoose.model('Gallery', GallerySchema);
