const bcrypt = require("bcrypt")
const express = require("express")
const sessions = express.Router()
const User = require("../models/users")

//login to seessions
sessions.post('/', (req,res) => {

    User.findOne({ username: req.body.username }, (err, foundUser) => {

        if (err) {
            console.log('problem with the db:', err)
        }else if (!foundUser) {
            console.log('no user with that username')
        }else{
            if (bcrypt.compareSync(req.body.password, foundUser.password)) {

                req.session.currentUser = foundUser

                console.log('logged in as:', req.session.currentUser)

                res.status(200).send(req.session.currentUser)

            } else if(err) {

                res.status(400).json({ err: err.message})
                
            }
        }
    })
})

//log-out route
sessions.delete('/logout', (req, res) => {
    req.session.destroy((err) => {
        if(err){
            res.status(400).json({ err: err.message})
        }
        res.status(200).send("User logged out")
    })
    
})
module.exports = sessions