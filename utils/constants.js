const BAD_REQUEST_ERROR = 400;
const UNAUTHORIZED_ERROR = 401;
const PAGE_NOT_FOUND_ERROR = 404;
const ITERNAL_SERVER_ERROR = 500;
const OK_CODE = 200;
const EMAIL_ERROR = 409;
const BAD_REQUEST_MESSAGE = 'Данные не корректны';
const PAGE_NOT_FOUND_MESSAGE = 'Не найдены данные';
const ITERNAL_SERVER_MESSAGE = 'Произошла ошибка';
const AUTH_MESSAGE = 'Необходимо авторизоваться';
const EMAIL_MESSAGE = 'Этот емейл уже зарегистрирован';
const UNAUTHORIZED_MESSAGE = 'Неверные логин и пароль';
const REG_EXP = /^https?:\/\/(www\.)?[\w\d@:%~#=.+-/]+$/;

module.exports = {
  BAD_REQUEST_ERROR,
  UNAUTHORIZED_ERROR,
  EMAIL_ERROR,
  PAGE_NOT_FOUND_ERROR,
  ITERNAL_SERVER_ERROR,
  BAD_REQUEST_MESSAGE,
  OK_CODE,
  AUTH_MESSAGE,
  EMAIL_MESSAGE,
  UNAUTHORIZED_MESSAGE,
  PAGE_NOT_FOUND_MESSAGE,
  ITERNAL_SERVER_MESSAGE,
  REG_EXP,
};
