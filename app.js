require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT
const cors = require('cors')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
require('./config/DB.config')
const User = require('./models/User.model')
// Middlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(cookieParser())
app.use(morgan('dev'))


const authRoutes = require('./routes/Auth.routes')
app.use('/auth',authRoutes)
module.exports = {app , PORT}