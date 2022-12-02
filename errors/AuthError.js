class AuthError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
    this.message = 'Неправильные логин и пароль';
  }
}

module.exports = AuthError;
