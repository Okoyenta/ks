const passport = require('passport')

let ensureAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()){
        return next()
    }

    res.send('log in to have more access')
}

let forwardAuthenticated = (req, res, next) => {
    if(!req.isAuthenticated()){
        return  next()
    }

    res.send('signed in')

}


module.exports = { ensureAuthenticated, forwardAuthenticated }