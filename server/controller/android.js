const express = require('express'),
    router = express.Router(),
    android = require('../services/android');

router.post('/verifyReceipts', (req, res) => {
    console.log('REQ VERIFY RECEIPTS');
    android.verifyReceipts(req, obj => {
        console.log('RESPONSE VERIFY RECEIPTS');
        res.json(obj);
    });
});

module.exports = router;
