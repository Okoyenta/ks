const localStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const User = require('../model/User')

module.exports = function(passport){
    passport.use(
        new localStrategy( { usernameField: 'email' }, (email, password, done) => {
            User.findOne({email: email}).then( user => {
                if(!user){
                    return done(null, false, { message: 'email is not registred'})
                }

                bcrypt.compare(password, user.password, (err, isMarch) => {
                    if(err) throw err
                    if(isMarch){
                        return done(null, user)
                    } else {
                        return done(null, false, { message: 'password incorrect'})
                    }
                })
            })
        })
    )

    passport.serializeUser(function(user, done) {
        done(null, user.id)
    })

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user){
            done(err, user)
        })
    })

}