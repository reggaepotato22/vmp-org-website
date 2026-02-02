const Mission = require('../models/Mission');

// @desc    Get all missions
// @route   GET /api/missions
// @access  Public
exports.getMissions = async (req, res) => {
  try {
    const missions = await Mission.find().sort({ date: -1 });
    res.status(200).json({ success: true, count: missions.length, data: missions });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Get single mission
// @route   GET /api/missions/:id
// @access  Public
exports.getMission = async (req, res) => {
  try {
    const mission = await Mission.findById(req.params.id);

    if (!mission) {
      return res.status(404).json({ success: false, error: 'Mission not found' });
    }

    res.status(200).json({ success: true, data: mission });
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ success: false, error: 'Mission not found' });
    }
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Create new mission
// @route   POST /api/missions
// @access  Private
exports.createMission = async (req, res) => {
  try {
    const mission = await Mission.create(req.body);
    res.status(201).json({ success: true, data: mission });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({ success: false, error: messages });
    }
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Update mission
// @route   PUT /api/missions/:id
// @access  Private
exports.updateMission = async (req, res) => {
  try {
    let mission = await Mission.findById(req.params.id);

    if (!mission) {
      return res.status(404).json({ success: false, error: 'Mission not found' });
    }

    mission = await Mission.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ success: true, data: mission });
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ success: false, error: 'Mission not found' });
    }
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Delete mission
// @route   DELETE /api/missions/:id
// @access  Private
exports.deleteMission = async (req, res) => {
  try {
    const mission = await Mission.findById(req.params.id);

    if (!mission) {
      return res.status(404).json({ success: false, error: 'Mission not found' });
    }

    await mission.deleteOne();

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ success: false, error: 'Mission not found' });
    }
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};
