const express = require('express')
const passport = require('passport')
const userContoller = require('../controller/usercontroller')
const { forwardAuthenticated } = require('../middleware/auth')

const router = express.Router()

router.post('/register', forwardAuthenticated, userContoller.registerUser )
router.post('/login', forwardAuthenticated, userContoller.handleLogin )
router.get('/logout', userContoller.logout )

module.exports = router