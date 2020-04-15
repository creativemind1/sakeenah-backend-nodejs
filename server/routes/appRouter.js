'use strict';

const express = require('express'),
    router = express.Router(),
    category = require('../controller/category'),
    album = require('../controller/album'),
    audio = require('../controller/audio'),
    payment = require('../controller/payment'),
    bookmark = require('../controller/bookmark'),
    favorite = require('../controller/favorite'),
    user = require('../controller/user'),
    apple = require('../controller/apple');

router.use('/category', category);
router.use('/album', album);
router.use('/audio', audio);
router.use('/payment', payment);
router.use('/favorite', favorite);
router.use('/user', user);
router.use('/apple', apple);
router.use('/bookmark', bookmark);
router.use('/echo', (req, res) => {
    res.send('APP SAKEENAH');
});

module.exports = router;
