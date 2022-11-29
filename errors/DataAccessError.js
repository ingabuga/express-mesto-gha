const {
  UNAUTHORIZED_ERROR,
  UNAUTHORIZED_MESSAGE,
} = require('../utils/constants');
const CustomError = require('./CustomError');

class DataAccessError extends CustomError {
  constructor(message = UNAUTHORIZED_MESSAGE) {
    super(message);
    this.name = 'DataAccessError';
    this.message = message;
    this.code = UNAUTHORIZED_ERROR;
  }
}

module.exports = DataAccessError;
