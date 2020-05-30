const express = require('express'),
    router = express.Router(),
    apple = require('../services/apple');

router.post('/verifyReceipt', (req, res) => {
    console.log('REQ VERIFY RECEIPT');
    apple.verifyReceipt(req, obj => {
        console.log('RESPONSE VERIFY RECEIPT');
        res.json(obj);
    });
});

module.exports = router;
