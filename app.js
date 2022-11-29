const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
const token = require('rand-token')

require('./controller/passport')(passport)

const app = express()
const PORT = process.env.PORT || 5000

//configure database
const db = require('./config/key').mongoURL
mongoose.connect(db, {useUnifiedTopology: true , useNewUrlParser : true})

//bodyparser
app.use(express.urlencoded({ extended: false}))
app.use(express.json())

//session
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );

//passport config
app.use(passport.initialize())
app.use(passport.session())

setTimeout(() => {
    console.log("Delayed for 1 second.");
  }, "1000")

  function intervalFunc() {
    console.log(token.generate(16));
  }
  
 // . setInterval(intervalFunc, 1500);

//routes
app.use('/', require('./routes/user'))
app.use('/home', require('./routes/index'))
app.use('/user', require('./routes/handleUser'))

app.listen(PORT, () => {
    console.log('running')
})