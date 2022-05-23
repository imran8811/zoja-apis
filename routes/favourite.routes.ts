var express = require('express');
var router = express.Router();

import { createFavourite, deleteFavourite } from '../controllers/favourite.controller'

router.post('/add', createFavourite);
router.delete('/delete/:listingId/:userId', deleteFavourite);
// router.get('/get/:id', favouriteController.findOne);
// router.put('/update/:id', favouriteController.update);

module.exports = router;
