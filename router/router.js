
//MODULES ---------------------------------------------------------
const express = require('express'),
    router = express.Router();
//CONTROLLEURS ----------------------------------------------------

const SpotifyController = require('./controllers/SpotifyController')
// MIDDLEWARES

const SpotifyMiddleware = require('./middlewares/SpotifyTokenMiddleware')

router.route('/test')
    .get(SpotifyMiddleware, SpotifyController.test)

router.route('/callback')
    .get(SpotifyController.callback)

router.route('/login')
    .get(SpotifyController.login)
module.exports = router

