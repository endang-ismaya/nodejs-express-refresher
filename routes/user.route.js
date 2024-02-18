const {
  getAllUser,
  getUser,
  createUser,
  deleteUser,
  updateUser,
  uploadPicture,
} = require('../controllers/user.controller');
const authorization = require('../middlewares/authorization.middleware');
const isAdmin = require('../middlewares/is_admin.middleware');
const multer = require('multer');
const isAdminOrSelf = require('../middlewares/isadmin_or_self.middleware');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/users');
  },
  filename: (req, file, cb) => {
    const MIME_MAP = {
      'image/png': 'png',
      'image/gif': 'gif',
      'image/jpeg': 'jpg',
      'image/jpg': 'jpg',
    };
    // cb(null, `${Date.now()}-${file.originalname}`);
    cb(null, `${Date.now()}_${req.user.id}.${MIME_MAP[file.mimetype]}`);
  },
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const mimeTypes = ['image/png', 'image/gif', 'image/jpeg', 'image/jpg'];
    if (mimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      req.hasError = true;
      req.errors = { picture: ['File type is not supported'] };
      cb(null, false);
    }
  },
});
const router = require('express').Router();

// route
router.get('/', authorization, getAllUser);
router.post('/', createUser);
router.get('/:id', authorization, getUser);
router.put('/:id', authorization, isAdminOrSelf, updateUser);
router.delete('/:id', authorization, isAdmin, deleteUser);
router.post(
  '/:id/picture',
  authorization,
  isAdminOrSelf,
  upload.single('picture'),
  uploadPicture
);
module.exports = router;
