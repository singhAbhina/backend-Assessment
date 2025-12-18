const ingestService = require('../services/ingest.service');

exports.ingestController = async (req, res, next) => {
  try {
    const result = await ingestService.ingestNews();
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};
