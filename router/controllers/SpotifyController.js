require('dotenv').config()

const axios = require('axios')
const queryString = require('query-string');
const generateRandomString = function (length) {
    let text = ''
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}
const scopes = [
    'user-read-private',
    'user-read-email',
    'user-read-recently-played',
    'user-top-read',
    'user-follow-read',
    'user-follow-modify',
    'playlist-read-private',
    'playlist-read-collaborative',
    'playlist-modify-public',
    'playlist-modify-private'
]

const Request = (params) => axios({
    url: process.env.SPOTIFY_API_URL,
    method: 'POST',
    params,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})
const stateKey = 'spotify_auth_state'

module.exports = {
    login: async (_, res) => {
        const state = generateRandomString(16)
        res.cookie(stateKey, state)
        console.log("login function:", stateKey, state);
        return res.redirect(
            `https://accounts.spotify.com/authorize?${queryString.stringify({
                response_type: 'code',
                client_id: process.env.SPOTIFY_CLIENT_ID,
                scope: scopes.join(' '),
                redirect_uri: process.env.CALLBACK_URL,
                state: state,
                show_dialog: true
            })}`
        )
    },
    callback: async (req, res) => {
        const { code, state } = req.query
        const storedState = req.headers.cookie ? req.headers.cookie[stateKey] : null
        console.log("state KEY:", stateKey);
        console.log("req.headers.cookie", req.headers.cookie)
        console.log("req.headers.cookie[stateKey]", typeof req.headers.cookie[stateKey]);
        if (!state || state != storedState) {
            return res.redirect(
                `${process.env.FRONTEND_URI}/#${queryString.stringify({ error: 'state_mismatch' })}`
            )
        }
        res.clearCookie(stateKey)

        try {
            const params = {
                client_id: process.env.SPOTIFY_CLIENT_ID,
                client_secret: process.env.SPOTIFY_CLIENT_SECRET,
                grant_type: 'authorization_code',
                redirect_uri: CALLBACK_URL,
                code
            }
            const { data: { access_token, refresh_token } } = await Request(params)

            res.redirect(
                `${process.env.FRONTEND_URI}/#${queryString.stringify({
                    access_token,
                    refresh_token
                })}`
            )
        } catch (err) {
            res.redirect(`${process.env.FRONTEND_URI}/#${queryString.stringify({ error: 'invalid_token' })}`)
        }
    }
}