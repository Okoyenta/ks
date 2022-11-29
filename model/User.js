const mongoose = require('mongoose')
const token = require('rand-token')


const userSchema = new mongoose.Schema({
    name : { type: String, required: true },
    email : { type: String, required: true },
    password: { type: String, required: true },
    date: { type: Date, default: Date.now },
    usage: { type: Number, default: 0 },
    active: { type: Boolean, default: false},
    token: { type: String, default: token.generate(40) }
})

const User = mongoose.model('user', userSchema)

module.exports = User