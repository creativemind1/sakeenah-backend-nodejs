const express = require('express'),
    router = express.Router(),
    android = require('../services/android');

router.post('/verifyReceipt', (req, res) => {
    console.log('REQ VERIFY RECEIPT');
    android.verifyReceipt(req, obj => {
        console.log('RESPONSE VERIFY RECEIPT');
        res.json(obj);
    });
});

module.exports = router;
