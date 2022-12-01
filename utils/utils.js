// const CustomError = require('../errors/CustomError');
const {
  ITERNAL_SERVER_ERROR,
  ITERNAL_SERVER_MESSAGE,
} = require('./constants');

// function handleLog(err) {
//   console.log(err.message);
// }

// const handleError = (err, res) => {
//   if (err instanceof CustomError) {
//     err.sendError(res);
//   } else if (err.name === 'ValidationError') {
//     res.status(BAD_REQUEST_ERROR).send({ message: BAD_REQUEST_MESSAGE });
//   } else if (err.name === 'CastError') {
//     res.status(BAD_REQUEST_ERROR).send({ message: BAD_REQUEST_MESSAGE });
//   } else if (err.code === 11000) {
//     res.status(EMAIL_ERROR).send({ message: EMAIL_MESSAGE });
//   } else {
//     handleLog(err);
//     res.status(ITERNAL_SERVER_ERROR).send({ message: ITERNAL_SERVER_MESSAGE });
//   }
// };

const handleError = ((err, req, res, next) => {
  res.status(ITERNAL_SERVER_ERROR).send({ ITERNAL_SERVER_MESSAGE });
  next();
});

module.exports = { handleError };
