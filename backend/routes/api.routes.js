const express = require('express');
const router = express.Router();
const dataController = require('../controllers/data.controller');

router.get('/live-data', dataController.getLiveData);
router.get('/station-photo/:stNo', dataController.getStationPhoto);

module.exports = router;
