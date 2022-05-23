var express = require('express');
var router = express.Router();

import { 
    logout, 
    createProfile, 
    loginUser, 
    findOneUser, 
    updateOneUser, 
    searchUsers,
    passResetEmail,
    passReset,
    checkEmailValidity
} from '../controllers/user.controller';

router.post('/login', loginUser);
router.post('/createProfile', createProfile);
router.get('/:id', findOneUser);
router.put('/:id', updateOneUser);
router.post('/search', searchUsers);
router.post('/logout', logout);
router.post('/forgot-password', passResetEmail);
router.post('/reset-password', passReset);
router.post('/check-email-validity', checkEmailValidity);

module.exports = router;
