/**
 *@description category router
 */
'use strict';
const express = require('express'),
    router = express.Router(),
    category = require('../services/category');

router.post('/list', (req, res) => {
    console.log('REQ ALL CATEGORIES');
    category.list(req, obj => {
        if (obj) {
            console.log(
                'RESPONSE ALL CATEGORIES (1)',
                obj.data && obj.data.length && obj.data[0],
                '& length is',
                obj.data && obj.data.length
            );
        }
        res.json(obj);
    });
});

module.exports = router;
