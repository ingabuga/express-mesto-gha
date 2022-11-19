const {
  BAD_REQUEST_ERROR,
  ITERNAL_SERVER_ERROR,
  BAD_REQUEST_MESSAGE,
  ITERNAL_SERVER_MESSAGE,
} = require('./constants');

const handleError = (err, res) => {
  if (err.name === 'NotFoundError' || err.name === 'BadRequestError') {
    res.status(err.code).send({ message: err.message });
  } else if (err.name === 'CastError') {
    res.status(BAD_REQUEST_ERROR).send({ message: BAD_REQUEST_MESSAGE });
  } else if (err.name === 'ValidationError') {
    res.status(BAD_REQUEST_ERROR).send({ message: BAD_REQUEST_MESSAGE });
  } else {
    res.status(ITERNAL_SERVER_ERROR).send({ message: ITERNAL_SERVER_MESSAGE });
  }
};

module.exports = { handleError };
