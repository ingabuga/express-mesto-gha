const { PAGE_NOT_FOUND_ERROR, PAGE_NOT_FOUND_MESSAGE } = require('../utils/constants');
const CustomError = require('./CustomError');

class NotFoundError extends CustomError {
  constructor() {
    super();
    this.name = 'NotFoundError';
    this.code = PAGE_NOT_FOUND_ERROR;
    this.message = PAGE_NOT_FOUND_MESSAGE;
  }
}

module.exports = { NotFoundError };
