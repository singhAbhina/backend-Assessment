const router = require('express').Router();

router.get('/:sessionId', (req, res) => {
  res.json({
    success: true,
    data: [],
    message: 'History not implemented yet'
  });
});

router.delete('/:sessionId', (req, res) => {
  res.json({
    success: true,
    message: 'History cleared (stub)'
  });
});

module.exports = router;

