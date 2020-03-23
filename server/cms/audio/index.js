'use strict';
/**
 * @description CRUD on audio
*/

const express = require('express'),
    router = express.Router(),
    Audio = require('../../model/Audio'),
    randomstring = require('randomstring');


router.post('/save', (req, res) => {
    let responseObj = { status: 'FAILED', message: null };
    let doc = new Audio({
        albumId: randomstring.generate(5),
        episode: 1
    })
    doc.save((e, s) => {
        if (!e && s) {
            responseObj.status = 'SUCCESS';
        }
        res.json(responseObj);
    })
});

module.exports = router;
