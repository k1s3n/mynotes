const express = require('express');
const { registerUser, loginUser, getUsers, toggleAdminStatus } = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

router.route('/')
  .get(protect, admin, getUsers)

router.route('/:id')
    .put(protect, admin, toggleAdminStatus)

module.exports = router;
