'use strict';
/**
* @description CRUD on category
*/

const express = require('express'),
    router = express.Router(),
    Category = require('../../model/Category'),
    randomstring = require('randomstring');


router.post('/save', (req, res) => {
    let responseObj = { status: 'FAILED', message: null };
    let doc = new Category({
        categoryId: randomstring.generate(5),
        categoryName: 'cat1',
        description: 'cat1111',
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
