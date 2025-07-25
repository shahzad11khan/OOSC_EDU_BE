const express = require('express');
const router = express.Router();
const apiStatus = require('../utils/apiControl');

// POST /toggle - { status: true/false }
router.post('/toggle', (req, res) => {
  const { status } = req.body;

  if (typeof status !== 'boolean') {
    return res.status(400).json({ message: 'Status must be boolean (true or false)' });
  }

  apiStatus.allAPIs = status;
  return res.json({ message: `All APIs are now ${status ? 'ON' : 'OFF'}` });
});

module.exports = router;
