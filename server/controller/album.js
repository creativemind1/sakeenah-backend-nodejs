/**
 *
 */
let album = require('../services/album');

module.exports = {
    list: (req, res) => {
        album.list(req, obj => {
            res.json(obj);
        });
    },
};
