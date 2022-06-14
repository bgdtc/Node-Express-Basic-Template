module.exports = {
    samplefunction: async (req, res) => {
        console.log("samplefunction")
        res.status(200).send('sample middleware & sampleFunction activated')
    }
}

