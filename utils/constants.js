const BAD_REQUEST_ERROR = 400;
const BAD_REQUEST_MESSAGE = 'Данные не корректны';

const UNAUTHORIZED_ERROR = 401;
const UNAUTHORIZED_MESSAGE = 'Неправильные логин и пароль';

const FORBIDDEN_ERROR = 403;
const FORBIDDEN_MESSAGE = 'Ошибка доступа';

const PAGE_NOT_FOUND_ERROR = 404;
const PAGE_NOT_FOUND_MESSAGE = 'Данные не найдены';

const EMAIL_ERROR = 409;
const EMAIL_MESSAGE = 'Этот email уже зарегистрирован';

const DEFAULT_ERROR_ERROR = 500;
const DEFAULT_ERROR_MESSAGE = 'Произошла ошибка';

const CREATED_CODE = 201;
const AUTH_MESSAGE = 'Нужно авторизоваться';

const LOGOUT_MESSAGE = 'Выход из аккаунта выполнен';
const DEFAULT_USER_NAME = 'Жак-Ив Кусто';
const DEFAULT_USER_ABOUT = 'Исследователь';
const DEFAULT_AVATAR_LINK = 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png';
const REG_EXP = /(https?:\/\/)([a-zA-Z0-9]+)|(w{3}\.)?([a-zA-Z0-9-]{0,63}\.)([a-zA-Z]{2,4})(\/[\w\-._~:/?#[\]@!$&'()*+,;=]#?)?/;

const ORIGINS = [
  'http://localhost:3001',
  'http://localhost:3000',
  'http://ingabuga.nomoredomains.club',
  'https://ingabuga.nomoredomains.club',
];

const CORS_DATA = {
  origin: ORIGINS,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

module.exports = {
  BAD_REQUEST_ERROR,
  PAGE_NOT_FOUND_ERROR,
  UNAUTHORIZED_ERROR,
  DEFAULT_ERROR_ERROR,
  EMAIL_ERROR,
  FORBIDDEN_ERROR,
  CREATED_CODE,
  BAD_REQUEST_MESSAGE,
  PAGE_NOT_FOUND_MESSAGE,
  UNAUTHORIZED_MESSAGE,
  AUTH_MESSAGE,
  EMAIL_MESSAGE,
  FORBIDDEN_MESSAGE,
  DEFAULT_ERROR_MESSAGE,
  LOGOUT_MESSAGE,
  DEFAULT_USER_NAME,
  DEFAULT_USER_ABOUT,
  DEFAULT_AVATAR_LINK,
  REG_EXP,
  CORS_DATA,
};
