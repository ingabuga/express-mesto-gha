const {
  BAD_REQUEST_ERROR,
  ITERNAL_SERVER_ERROR,
  EMAIL_ERROR,
  BAD_REQUEST_MESSAGE,
  ITERNAL_SERVER_MESSAGE,
  EMAIL_MESSAGE,
} = require('./constants');
const CustomError = require('../error/CustomError');

const handleError = (err, res) => {
  if (err instanceof CustomError) {
    err.sendError(res);
  } else if (err.name === 'ValidationError') {
    res.status(BAD_REQUEST_ERROR).send({ message: BAD_REQUEST_MESSAGE });
  } else if (err.name === 'CastError') {
    res.status(BAD_REQUEST_ERROR).send({ message: BAD_REQUEST_MESSAGE });
  } else if (err.code === 11000) {
    res.status(EMAIL_ERROR).send({ message: EMAIL_MESSAGE });
  } else {
    res.status(ITERNAL_SERVER_ERROR).send({ message: ITERNAL_SERVER_MESSAGE });
  }
};

module.exports = { handleError };
