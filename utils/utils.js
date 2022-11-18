const {
  BAD_REQUEST_ERROR,
  ITERNAL_SERVER_ERROR,
  BAD_REQUEST_MESSAGE,
  ITERNAL_SERVER_MESSAGE,
} = require('./constants');

function handleLog(err) {
  console.log(err.message);
}

const handleError = (err, res) => {
  if (err.name === 'NotFoundError' || err.name === 'BadRequestError') {
    handleLog(err);
    res.status(err.code).send({ message: err.message });
  } else if (err.name === 'CastError') {
    handleLog(err);
    res.status(BAD_REQUEST_ERROR).send({ message: BAD_REQUEST_MESSAGE });
  } else if (err.name === 'ValidationError') {
    handleLog(err);
    res.status(BAD_REQUEST_ERROR).send({ message: BAD_REQUEST_MESSAGE });
  } else {
    handleLog(err);
    res.status(ITERNAL_SERVER_ERROR).send({ message: ITERNAL_SERVER_MESSAGE });
  }
};

module.exports = { handleError };
