const mongoose = require('mongoose');

const MissionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  missionCoverImage: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  date: {
    type: String, // Or Date, but string allows "July 15-22"
    required: true
  },
  year: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Upcoming', 'Completed', 'Ongoing'],
    default: 'Upcoming'
  },
  team: {
    type: String // e.g., "12 volunteers"
  },
  outcome: {
    type: String // Results summary
  },
  stats: {
    treated: { type: String, default: "0" },
    value: { type: String, default: "$0" },
    bibles: { type: String, default: "0" }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Mission', MissionSchema);
