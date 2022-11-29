const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCurrentUser,
  getUsers,
  getUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');
const { REG_EXP } = require('../utils/constants');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get(
  '/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().alphanum().length(24),
    }),
  }),
  getUser,
);
router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string()
        .min(2)
        .max(30)
        .required(),
      about: Joi.string()
        .min(2)
        .max(30)
        .required(),
    }),
  }),
  updateProfile,
);
router.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string()
        .required()
        .pattern(REG_EXP),
    }),
  }),
  updateAvatar,
);

module.exports = router;
