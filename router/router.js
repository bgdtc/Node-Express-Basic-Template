
//MODULES ---------------------------------------------------------
const express = require('express'),
    router = express.Router();
//CONTROLLEURS ----------------------------------------------------
const SampleController = require('./controllers/SampleController')
// MIDDLEWARES
const SampleMiddleware = require('./middlewares/SampleMiddleware')

router.route('/sample')
    .get(SampleMiddleware, SampleController.samplefunction)

module.exports = router

