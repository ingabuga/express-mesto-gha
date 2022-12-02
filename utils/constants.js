const BAD_REQUEST_ERROR = 400;
const BAD_REQUEST_MESSAGE = 'Данные не корректны';

const UNAUTHORIZED_ERROR = 401;
const UNAUTHORIZED_MESSAGE = 'Неправильные логин и пароль';

const FORBIDDEN_ERROR = 403;
const FORBIDDEN_MESSAGE = 'Ошибка доступа';

const PAGE_NOT_FOUND_ERROR = 404;
const PAGE_NOT_FOUND_MESSAGE = 'Не найдены данные';

const EMAIL_ERROR = 409;
const EMAIL_MESSAGE = 'Этот емейл уже зарегистрирован';

const ITERNAL_SERVER_ERROR = 500;
const ITERNAL_SERVER_MESSAGE = 'Произошла ошибка';

const CREATED_ERROR = 201;
const AUTH_MESSAGE = 'Нужно авторизоваться';
// const REG_EXP = /(https?:\/\/)([a-zA-Z0-9]+)|(w{3}\.)
// ?([a-zA-Z0-9-]{0,63}\.)([a-zA-Z]{2,4})(\/[\w\-._~:/?#[\]@!$&'()*+,;=]#?)?/;

const REG_EXP = /^https?:\/\/(www\.)?[a-zA-Z\d-]+\.[\w\d\-.~:/?#[\]@!$&'()*+,;=]{2,}#?$/;

module.exports = {
  BAD_REQUEST_ERROR,
  BAD_REQUEST_MESSAGE,
  UNAUTHORIZED_ERROR,
  UNAUTHORIZED_MESSAGE,
  PAGE_NOT_FOUND_ERROR,
  PAGE_NOT_FOUND_MESSAGE,
  ITERNAL_SERVER_ERROR,
  ITERNAL_SERVER_MESSAGE,
  EMAIL_ERROR,
  EMAIL_MESSAGE,
  FORBIDDEN_ERROR,
  FORBIDDEN_MESSAGE,
  CREATED_ERROR,
  AUTH_MESSAGE,
  REG_EXP,
};
