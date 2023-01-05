const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
const token = require('rand-token')
const cors = require('cors')


require('./controller/passport')(passport)

const app = express()
const PORT = process.env.PORT || 5000

//cors
app.use(cors())

//configure database
const db = require('./config_/key').mongoURL
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


//routes
app.use('/', require('./routes/user'))
app.use('/home', require('./routes/index'))
app.use('/user', require('./routes/handleUser'))

app.listen(PORT, () => {
    console.log('running')
})