const {
  BAD_REQUEST_ERROR, BAD_REQUEST_MESSAGE,
} = require('../utils/constants');
const CustomError = require('./CustomError');

class BadRequestError extends CustomError {
  constructor() {
    super();
    this.name = 'BadRequestError';
    this.message = BAD_REQUEST_MESSAGE;
    this.code = BAD_REQUEST_ERROR;
  }
}

module.exports = BadRequestError;
