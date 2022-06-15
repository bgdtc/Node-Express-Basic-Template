require('dotenv').config()

const axios = require('axios')
const base64 = require('base-64')

module.exports = function (req, res, next) {
    // SERIALIZING BODY OF REQUEST FOR SPOTIFY API
    const serialize = function (obj) {
        let str = [];
        for (let p in obj) {
            if (obj.hasOwnProperty(p)) { str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p])) }
        }
        return str.join("&");
    }
    // ENCODING API APP CREDENTIALS INTO B64
    let token_data = process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_CLIENT_SECRET
    let b64_token = base64.encode(token_data)
    // POSTING REQUEST TO SPTFY API TO RETRIEVE TOKEN
    axios.post('https://accounts.spotify.com/api/token',
        serialize({ grant_type: 'client_credentials' }), {
        headers: { 'Authorization': `Basic   ${b64_token}` }
    })
        // THEN SEND RESPONSE TO CONTROLLER FUNC WITH TOKEN
        .then((response) => {
            console.log("[TOKEN D'ACCÈS À L'API GÉNÉRÉ suite => ....]")
            res.token = response.data.access_token
            next()
        })
        .catch((err) => console.log(err))

}