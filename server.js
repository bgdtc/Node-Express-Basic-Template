//IMPORT DE DOTENV
require('dotenv').config()

//IMPORT DES MODULES
const
    express = require('express'),
    app = express(),
    cors = require('cors'),
    expressSession = require('express-session'),
    bodyParser = require('body-parser'),
    port = process.env.PORT,
    ROUTER = require('./router/router');

app.use('/', ROUTER)
app.get('*', function (req, res) { res.status(404).send({ error: "error" }) })
app.use(cors({
    origin: ['http://localhost:4000'], methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))
app.use('/assets', express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.listen(port, () => { console.log("le serveur tourne bien sur le port:" + port) });


// //
//     $$$$$$$\   $$$$$$\  $$$$$$$\ $$$$$$$$\  $$$$$$\  
//     $$  __$$\ $$  __$$\ $$  __$$\\__$$  __|$$  __$$\ 
//     $$ |  $$ |$$ /  \__|$$ |  $$ |  $$ |   $$ /  \__|
//     $$$$$$$\ |$$ |$$$$\ $$ |  $$ |  $$ |   $$ |      
//     $$  __$$\ $$ |\_$$ |$$ |  $$ |  $$ |   $$ |      
//     $$ |  $$ |$$ |  $$ |$$ |  $$ |  $$ |   $$ |  $$\ 
//     $$$$$$$  |\$$$$$$  |$$$$$$$  |  $$ |   \$$$$$$  |
//     \_______/  \______/ \_______/   \__|    \______/ 