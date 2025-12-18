const router = require('express').Router();
const { ingestController } = require('../controllers/ingest.controller');

router.post('/', ingestController);

module.exports = router;
