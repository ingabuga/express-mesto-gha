const router = require('express').Router();

const {
  getCards,
  createCard,
  removeCard,
  setLike,
  removeLike,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:cardId', removeCard);
router.put('/:cardId/likes', setLike);
router.delete('/:cardId/likes', removeLike);

module.exports = router;
