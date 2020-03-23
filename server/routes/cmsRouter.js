/**
 * @description CMS router
 */
'use strict';
const express = require('express'),
    router = express.Router(),
    category = require('../cms/category'),
    album = require('../cms/album'),
    audio = require('../cms/audio');
router.use('/category', category);
router.use('/album', album);
router.use('/audio', audio);
router.use('/echo', (req, res) => {
    res.send('CMS SAKEENAH');
});

module.exports = router;
