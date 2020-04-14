/**
 *@description audio router
 */

const express = require('express'),
    router = express.Router(),
    audio = require('../services/audio');

router.post('/list', (req, res) => {
    audio.list(req, obj => {
        res.json(obj);
    });
});
router.post('/completed', (req, res) => {
    audio.completed(req, obj => {
        res.json(obj);
    });
});

router.post('/cms_audio_list', (req, res) => {
    audio.cms_audio_list(req, obj => {
        res.json(obj);
    });
});

module.exports = router;
