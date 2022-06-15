
//MODULES ---------------------------------------------------------
const express = require('express'),
    router = express.Router();
//CONTROLLEURS ----------------------------------------------------

const SpotifyController = require('./controllers/SpotifyController')
// MIDDLEWARES

const SpotifyMiddleware = require('./middlewares/SpotifyTokenMiddleware')

router.route('/test')
    .get(SpotifyMiddleware, SpotifyController.test)

module.exports = router

