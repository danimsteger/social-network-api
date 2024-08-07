const router = require('express').Router();
const {
  getUsers,
  createUser,
  getOneUser,
} = require('../../controllers/userController');

router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getOneUser);
module.exports = router;
