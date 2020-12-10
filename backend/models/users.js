const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {type:String, require:true},
    password: {type:String, require:true},
    "Movie List": [],
    "Top 5":[]
})

const Users = mongoose.model('Users', userSchema)
module.exports = Users