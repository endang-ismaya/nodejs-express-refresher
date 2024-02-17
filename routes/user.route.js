const {
  getAllUser,
  getUser,
  createUser,
  deleteUser,
  updateUser,
} = require('../controllers/user.controller');
const authorization = require('../middlewares/authorization.middleware');

const router = require('express').Router();

// route
router.get('/', authorization, getAllUser);
router.post('/', createUser);
router.delete('/:id', authorization, deleteUser);
router.get('/:id', authorization, getUser);
router.put('/:id', authorization, updateUser);

module.exports = router;
