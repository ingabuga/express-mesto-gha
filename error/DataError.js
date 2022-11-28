const {
  AUTHORIZATION_ERROR,
  AUTHORIZATION_MESSAGE,
} = require('../utils/constants');
const CustomError = require('./CustomError');

class DataError extends CustomError {
  constructor(message = AUTHORIZATION_MESSAGE) {
    super(message);
    this.name = 'DataError';
    this.message = message;
    this.code = AUTHORIZATION_ERROR;
  }
}

module.exports = DataError;
