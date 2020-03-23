/**
 *@description  album route controller
 */
'use strict';
const express = require('express'),
    router = express.Router(),
    album = require('../services/album');

router.post('/list', (req, res) => {
    album.list(req, obj => {
        res.json(obj);
    });
});

module.exports = router;
