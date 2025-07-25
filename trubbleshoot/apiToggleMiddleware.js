const apiStatus = require('../utils/apiControl');

const allApiToggleMiddleware = (req, res, next) => {
  if (!apiStatus.allAPIs) {
    return res.status(503).json({ message: 'All APIs are currently turned OFF' });
  }
  next();
};

module.exports = allApiToggleMiddleware;
