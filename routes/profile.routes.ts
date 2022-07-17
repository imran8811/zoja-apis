var express = require('express');
var router = express.Router();

import { 
  createProfile, 
  findOneProfile, 
  updateOneProfile, 
  searchProfiles,
} from '../controllers/profile.controller';

router.post('/createProfile', createProfile);
router.get('/:id', findOneProfile);
router.put('/:id', updateOneProfile);
router.post('/search', searchProfiles);

module.exports = router;
