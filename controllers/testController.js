const testService = require('../services/testService');

exports.test = (req, res) => {
  const message = testService.getMessage();

  res.send(message);
};