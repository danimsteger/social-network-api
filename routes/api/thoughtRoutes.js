const router = require('express').Router();

const {
  getThoughts,
  createThought,
  getOneThought,
  updateThought,
  deleteThought,
  createThoughtReaction,
  deleteThoughtReaction,
} = require('../../controllers/thoughtController');

router.route('/').get(getThoughts).post(createThought);

router
  .route('/:thoughtId')
  .get(getOneThought)
  .put(updateThought)
  .delete(deleteThought);

router.route('/:thoughtId/reactions').post(createThoughtReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(deleteThoughtReaction);

module.exports = router;
