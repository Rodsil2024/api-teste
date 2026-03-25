const express = require('express');
const router = express.Router();

const testController = require('../controllers/testController');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../config/upload');
const fileController = require('../controllers/fileController');


router.get('/teste', authMiddleware, testController.test);



module.exports = router;

const authController = require('../controllers/authController');

router.post('/login', authController.login);

const userController = require('../controllers/userController');

router.post('/users', userController.createUser);

const db = require('../database/db');

router.get('/debug-users', (req, res) => {
  db.all('SELECT * FROM users', [], (err, rows) => {
    res.json(rows);
  });
});

router.post(
  '/file/upload',
  authMiddleware,
  upload.single('file'),
  fileController.uploadFile
);

router.get(
  '/files',
  authMiddleware,
  fileController.getMyFiles
);

router.get(
  '/file/download/:filename',
  authMiddleware,
  fileController.downloadFile
);

router.delete(
  '/file/:filename',
  authMiddleware,
  fileController.deleteFile
);
