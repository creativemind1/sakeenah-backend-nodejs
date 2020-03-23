'use strict';
/**
 *@description CRUD on album
*/

const express = require('express'),
    router = express.Router(),
    Album = require('../../model/Album'),
    randomstring = require('randomstring');


router.post('/save', (req, res) => {
    let responseObj = { status: 'FAILED', message: null };
    let doc = new Album({
        albumId: randomstring.generate(5),
        seq: 1
    })
    doc.save((e, s) => {
        if (!e && s) {
            responseObj.status = 'SUCCESS';
        }
        res.json(responseObj);
    })
});

module.exports = router;
