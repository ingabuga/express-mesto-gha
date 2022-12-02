class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
    this.message = 'Не найдены данные';
  }
}

module.exports = NotFoundError;
