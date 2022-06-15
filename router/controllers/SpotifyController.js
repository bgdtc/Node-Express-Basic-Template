const axios = require('axios')
module.exports = {
    test: async (req, res) => {
        console.log("[TOKEN FROM MIDDLEWARE =>", res.token, "]")
        if (!res.token) {
            console.log("[PAS DE TOKEN => LE TOKEN N'ARRIVES PAS DU MIDDLEWARE]")
        } else {
            console.log("[Token récupéré => suite...]")
            await axios.get('https://api.spotify.com/v1/tracks/2TpxZ7JUBn3uw46aR7qd6V', {
                headers: { 'Authorization': `Bearer   ${res.token}` }
            }).then((response) => {
                res.status(200).send({ content: response.data })
                console.log("[REQUEST SUCCESS: ", response.status, "]")
            })
                .catch((err) => console.log(err))
        }
    },
    callback: async (req, res) => {
        console.log('[CALLBACK HIT]')
    }
}