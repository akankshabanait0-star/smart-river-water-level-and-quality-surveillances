const cpcbService = require('../services/cpcb.service');

exports.getLiveData = async (req, res) => {
  const result = await cpcbService.getLiveData();
  if (!result.success) {
    return res.status(503).json({ success: false, message: result.error, data: [] });
  }
  res.json(result.data);
};

exports.getStationPhoto = (req, res) => {
  const stNo = req.params.stNo;
  if (!stNo || !/^[A-Za-z0-9_-]+$/.test(stNo)) {
    return res.status(400).send('Invalid station code');
  }
  cpcbService.getStationPhotoStream(stNo, res);
};
