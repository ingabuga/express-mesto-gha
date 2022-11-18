const { BAD_REQUEST_ERROR, BAD_REQUEST_MESSAGE } = require('../utils/constants');

class BadRequestError extends Error {
  constructor() {
    super();
    this.name = 'BadRequestError';
    this.code = BAD_REQUEST_ERROR;
    this.message = BAD_REQUEST_MESSAGE;
  }
}

module.exports = { BadRequestError };
