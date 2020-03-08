/**
 *
 */
let favorite = require('../services/favorite')
module.exports = {
    favoriteAlbums: (req, res) => {
        favorite.favorites(req, (obj) => {
            res.json(obj)
        })
    },
    addFavorite: (req, res) => {
        favorite.addFavorite(req, (obj) => {
            res.json(obj)
        })
    },
    removeFavorite: (req, res) => {
        favorite.removeFavorite(req, (obj) => {
            res.json(obj)
        })
    }
};