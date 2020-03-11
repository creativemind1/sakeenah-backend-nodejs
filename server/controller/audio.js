/**
 * List of Audios Controller
 */
let audio = require("../services/audio");

module.exports = {
  list: (req, res) => {
    audio.list(req, obj => {
      res.json(obj);
    });
  },
  completed: (req, res) => {
    audio.completed(req, obj => {
      res.json(obj);
    });
  }
};
