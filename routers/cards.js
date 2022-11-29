const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const { REG_EXP } = require('../utils/constants');

const {
  getCards,
  createCard,
  removeCard,
  setLike,
  removeLike,
} = require('../controllers/cards');

router.get('/', getCards);
router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string()
        .min(2)
        .max(30)
        .required(),
      link: Joi.string()
        .required()
        .pattern(REG_EXP),
    }),
  }),
  createCard,
);
router.delete(
  '/:cardId',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().alphanum().length(24),
    }),
  }),
  removeCard,
);
router.put(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().alphanum().length(24),
    }),
  }),
  setLike,
);
router.delete(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().alphanum().length(24),
    }),
  }),
  removeLike,
);

module.exports = router;
