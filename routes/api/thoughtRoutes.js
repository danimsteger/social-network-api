const router = require('express').Router();

// Import thought controllers
const {
  getThoughts,
  createThought,
  getOneThought,
  updateThought,
  deleteThought,
  createThoughtReaction,
  deleteThoughtReaction,
} = require('../../controllers/thoughtController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router
  .route('/:thoughtId')
  .get(getOneThought)
  .put(updateThought)
  .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(createThoughtReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(deleteThoughtReaction);

module.exports = router;
