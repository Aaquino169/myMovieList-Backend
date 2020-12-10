const express = require("express")
const mongoose = require("mongoose")
const session = require('express-session')
const cors = require('cors')
const bodyParser = require("body-parser")
const app = express()

require('dotenv').config()
const port = process.env.PORT
const mongodbURI = process.env.MONGODBURI

app.use(bodyParser.json());

//cors middleware
const whitelist = [process.env.FRONTEND]
const corsOptions = {
    origin: (origin, callback) => {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }, credentials: true
}

app.use(cors(corsOptions))

//middleware for mongoose
mongoose.connect(mongodbURI, { useNewUrlParser:true })
mongoose.connection.once('open', () => {
    console.log('connected to db')
})
mongoose.connection.on('error', err =>console.log(err.message))
mongoose.connection.on('disconnected', () =>console.log('mongo disconnected'))

//middleware for sessions
app.use( session({ secret: 'ilovemovies',resave: false,saveUninitialized: false}))

//controllers
const usersController = require("./controllers/users")
app.use('/user', usersController)
const sessionsController = require("./controllers/session")
app.use('/login', sessionsController)


app.listen(port, () => {
    console.log("running on port:",port)
})

