
//MODULES ---------------------------------------------------------
const express = require('express'),
    router = express.Router();
//CONTROLLEURS ----------------------------------------------------

const SpotifyController = require('./controllers/SpotifyController')
// MIDDLEWARES

const SpotifyMiddleware = require('./middlewares/SpotifyLoginMiddleware')

router.route('/login')
    .get(SpotifyController.login)

router.route('/callback')
    .get(SpotifyController.callback)

module.exports = router

