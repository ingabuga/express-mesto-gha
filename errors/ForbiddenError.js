// const {
//   FORBIDDEN_ERROR, FORBIDDEN_MESSAGE,
// } = require('../utils/constants');
// const CustomError = require('./CustomError');

// class ForbiddenError extends CustomError {
//   constructor() {
//     super();
//     this.name = 'ForbiddenError';
//     this.message = FORBIDDEN_MESSAGE;
//     this.code = FORBIDDEN_ERROR;
//   }
// }

// module.exports = ForbiddenError;

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

module.exports = ForbiddenError;
