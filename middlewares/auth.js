const jwt = require('jsonwebtoken');
const { UNAUTHORIZED_ERROR, AUTH_MESSAGE } = require('../utils/constants');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(UNAUTHORIZED_ERROR)
      .send({ AUTH_MESSAGE });
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return res
      .status(UNAUTHORIZED_ERROR)
      .send({ AUTH_MESSAGE });
  }

  req.user = payload;
  next();
};
