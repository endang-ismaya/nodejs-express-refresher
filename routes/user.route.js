const {
  getAllUser,
  getUser,
  createUser,
  deleteUser,
  updateUser,
} = require('../controllers/user.controller');

const router = require('express').Router();

// route
router.get('/', getAllUser);
router.post('/', createUser);
router.delete('/:id', deleteUser);
router.get('/:id', getUser);
router.put('/:id', updateUser);

module.exports = router;
