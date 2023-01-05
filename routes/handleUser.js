const express = require('express')
const handleUser = require('../controller/handleusercontroller')
const { ensureAuthenticated } = require('../middleware/auth')
const { authenticateToken } = require('../middleware/tokenAuth')

const router = express.Router()


router.get('/', authenticateToken, handleUser.getAllUser)
router.put('/:name', handleUser.updateUser)
router.get('/:name', handleUser.getUser)
router.delete('/:name', handleUser.deleteUser)
router.delete('/remove/user', handleUser.deleteAllUser)

module.exports = router