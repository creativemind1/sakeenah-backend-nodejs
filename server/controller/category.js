/*
 *
 */
let category = require('../services/category');

module.exports = {
    list: (req, res) => {
        category.list(req, obj => {
            res.json(obj);
        });
    },
};
