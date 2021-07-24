'use strict';

function notFoundHandler(req, res) {
  res.status(404).send('ERROR: Something went wrong');
}

module.exports = notFoundHandler;