const mongoose = require('mongoose')
const User = require('../model/User')



let getAllUser =  async (req, res) => {
    let kap = await User.find()
    res.send(kap)
}

let getUser = async (req, res) => {
    const { name } = req.params
    let kap = await User.findOne({ name: name })
    if(!kap){
        return res.status(404).send(`${name} does not exist `)
    }
    res.send(kap)
    
}

let deleteUser = async (req, res) => {
    const { name } = req.params
    let kap = await User.findOne({ name: name})
    let k = await User.deleteOne(kap)
    res.send('done')
}

let updateUser = async (req, res) => {
    const kop = req.params.name
    let { name, email } = req.body
    let update = { name, email }
    let kap = await User.findOne({ name: kop })
    let kip = await User.find({email: email})
    
    if(!kip){
        return res.send('email already exist')
    }

    let j = await User.findOne({ name: kop}).updateOne(update)

    res.send(j)


}

let deleteAllUser = async (req, res) => {
   let k = await User.deleteMany()
   console.log(k)
    res.send(k + 'love') 
}

module.exports = { getAllUser, getUser, deleteUser, updateUser, deleteAllUser }