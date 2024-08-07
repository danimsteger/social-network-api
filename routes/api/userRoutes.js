const router = require('express').Router();
const {
  getUsers,
  createUser,
  getOneUser,
  updateUser,
  deleteUser,
} = require('../../controllers/userController');

router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getOneUser).put(updateUser).delete(deleteUser);

module.exports = router;
