/**
 *@description  album route controller
 */
'use strict';
const express = require('express'),
    router = express.Router(),
    album = require('../services/album');

router.post('/list', (req, res) => {
    console.log('REQ ALBUM LIST');
    album.list(req, obj => {
        console.log('RESPONSE ALBUM LIST');
        res.json(obj);
    });
});

module.exports = router;
