const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');
const { AUTH_MESSAGE } = require('../utils/constants');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    next(new AuthError(AUTH_MESSAGE));
    return;
  }
  let payload;
  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    next(new AuthError(AUTH_MESSAGE));
  }
  req.user = payload;
  next();
};
