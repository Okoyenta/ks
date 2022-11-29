const express = require('express')
const { ensureAuthenticated, forwardAuthenticated } = require('../middleware/auth')

const router = express.Router()

router.get('/app', ensureAuthenticated, (req, res) => {
    res.send('love')
})

module.exports = router