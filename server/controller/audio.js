/**
 *@description audio router
 */

const express = require('express'),
    router = express.Router(),
    audio = require('../services/audio');

router.post('/list', (req, res) => {
    console.log('REQ AUDIO LIST');
    audio.list(req, obj => {
        console.log('RESPONSE AUDIO LIST (NO DATA as of now because of big)');
        res.json(obj);
    });
});
router.post('/completed', (req, res) => {
    audio.completed(req, obj => {
        res.json(obj);
    });
});

router.post('/cms_audio_list', (req, res) => {
    console.log('REQ AUDIO CMS LIST');
    audio.cms_audio_list(req, obj => {
        console.log('RESPONSE AUDIO CMS LIST (NO DATA as of now because of big)');
        res.json(obj);
    });
});

module.exports = router;
