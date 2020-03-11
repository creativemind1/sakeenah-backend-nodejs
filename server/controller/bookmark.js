/**
 *
 */
let bookmark = require('../services/bookmark')

module.exports = {
    add_bookmark: (req, res) => {
        bookmark.add_bookmark(req, obj => {
          res.json(obj);
        })
      },
      remove_bookmark: (req, res) => {
        bookmark.remove_bookmark(req, obj => {
          res.json(obj);
        })
      },
      user_bookmark: (req, res) => {
        bookmark.user_bookmark(req, obj => {
          res.json(obj);
        })
      }
};