const passport = require('passport')
const User = require('../model/User')
const bcrypt = require('bcryptjs')
const { json } = require('express')
const sgMail = require('@sendgrid/mail')
const key = require('../config/key')
const otp = require('rand-token')

const DOMAIN = 'https://app.mailgun.com/app/sending/domains/sandbox8f9dcd885cdb411688794db9606cfb85.mailgun.org';

    const formData = require('form-data');
    const Mailgun = require('mailgun.js');
    const mailgun = new Mailgun(formData);
    const mg = mailgun.client({username: 'kd', key: key.MAILGUN_API_KEY || 'key-yourkeyhere'});
    



const registerUser =  async (req, res, next) => {
    const { email, name, password, password2 } = req.body

    if( !name || !email || !password || !password2){
        return res.status(400).send('please fill all field')
    }

    if( password != password2 ) {
        return res.status(400).send('password does not match')
    }

    if (password < 6) {
        return res.status(400).send('password should be atleast 6 characters')
    }

    const kap = await User.findOne({ email: email })
    if(kap){
        return res.status(400).send('user already exist')
    }

    const newUser = new User({
        name, email, password
    })

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(newUser.password, salt)

    newUser.password = hash
    newUser.usage++
    newUser.save()
    let lak = newUser;

    //send otp to email
   /* sgMail.setApiKey(key)
        const msg = {
        to: 'ek.okoyenta@stu.unizik.edu.ng', // Change to your recipient
        from: 'ek.okoyenta@stu.unizik.edu.ng', // Change to your verified sender
        subject: 'Sending with SendGrid is Fun ' ,
        text: 'and easy to do anywhere, even with Node.js  i love you ',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
        }
    sgMail
    .send(msg)
    .then(() => {
        console.log('Email sent')
    })
    .catch((error) => {
        console.error(error)
    })  */

    const messageData = {
        from: 'Excited User <me@samples.mailgun.org>',
        to: 'okoyentaeva@gmail.com',
        subject: 'Hello',
        text: 'Testing some Mailgun awesomeness!'
      };
      
    let k =   mg.messages.create(DOMAIN, messageData)
    if(!k){
        return res.send('error')
    }
    console.log(k)
    

    res.status(200).json({ 
        status: 'ok',
        message: 'go to email to verify your OTP'
    })

  

   /* req.login(newUser, function(err) {
        if (err) { return next(err); }
        res.status(201).json('loged in');
      }); */
} 



//handle login
//const las = passport.authenticate('local')
const login = async (req, res) => {

    const { email, password } = req.body

    if( !email || !password ){
        return res.status(404).json({ 
            staus: 'error',
            message: 'fill in fields'
         })
    }


    const ks = await User.findOne({ email: email })
    const kup  = await bcrypt.compare(password, ks.password)

    if(kup == false){
       return res.status(404).json({ 
            status: 'error',
            message: 'password incorrect'
         })
    }

    
    ks.usage++
    ks.save()

    const lak = ks

    if(ks.active == false){

        //send otp to user
        return res.status(400).json({
            status: 'error',
            message : 'verify your email'
        })
    }

    res.status(200).json({ 
        status: 'ok',
        message: 'logged in',
        user: {
            active : lak.active,
            name : lak.name,
            email  : lak.email,
            token: lak.token,
            usage: lak.usage,
            dateCreated : lak.date,
            active : lak.active
        }
})
}

const handleLogin = [ login ]


/*
const logout = (req, res, next) => {
    req.logout(function(err){
        if(err) { return next(err) }
        res.send('logged out')
    })

}*/

const logout = async (req, res) => {

    const { token } = req.query
    let kap = await User.findOne({ token: token }).deleteOne({token})
    console.log(kap)

    if(kap.deletedCount == 0){
        return res.status(404).send("token does not exist")
    }

    res.send('logout')
}


module.exports = { registerUser, logout, handleLogin }