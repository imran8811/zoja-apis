var express = require('express');
var router = express.Router();

import { 
  logout,
  loginUser,
  findOneUser,
  updateOneUser,
  passResetEmail,
  passReset,
  checkEmailValidity,
  userRegister
} from '../controllers/user.controller';

router.post('/login', loginUser);
router.post('/register', userRegister);
router.get('/:id', findOneUser);
router.put('/:id', updateOneUser);
router.post('/logout', logout);
router.post('/forgot-password', passResetEmail);
router.post('/reset-password', passReset);
router.post('/check-email-validity', checkEmailValidity);

module.exports = router;
