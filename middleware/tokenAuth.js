const User = require('../model/User')

let authenticateToken = async (req, res, next) => {
    let { token } = req.query

    let ks = await User.findOne({ token : token })

    if(!ks){
        return res.status(404).json({
            status: 'error',
            message: 'token error'
        })
    }
    next()
}

module.exports = { authenticateToken }  