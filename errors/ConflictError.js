const {
  EMAIL_ERROR, EMAIL_MESSAGE,
} = require('../utils/constants');
const CustomError = require('./CustomError');

class ConflictError extends CustomError {
  constructor() {
    super();
    this.name = 'ConflictError';
    this.message = EMAIL_MESSAGE;
    this.code = EMAIL_ERROR;
  }
}

module.exports = ConflictError;
