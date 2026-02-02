const express = require('express');
const {
  getMissions,
  getMission,
  createMission,
  updateMission,
  deleteMission
} = require('../controllers/missionController');

const router = express.Router();

router
  .route('/')
  .get(getMissions)
  .post(createMission);

router
  .route('/:id')
  .get(getMission)
  .put(updateMission)
  .delete(deleteMission);

module.exports = router;
