const morgan = require('morgan')
const cookieParser = require('cookie-parser')
// App Initialization
const express = require('express')
const cors = require('cors')
const app = express()

// ENV init
require('dotenv').config()

// mongoose
const mongoose = require('mongoose')

// middleware

app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())
app.use(cors())

// db

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("db connected");
})
.catch(err => {
    console.log("Couldn't connect to db");
})

// Auth Routes
const authRoutes = require('./routes/authRoutes')
app.use('/api/auth', authRoutes)

// User Routes
const userRoutes = require('./routes/userRoutes')
app.use('/api/user', userRoutes)

// Category Routes
const categoryRoutes = require('./routes/categoryRoutes')
app.use('/api/category', categoryRoutes)

// Product Routes
const productRoutes = require('./routes/productRoutes')
app.use('/api/product', productRoutes)

const port = process.env.PORT || 8000

app.listen(port, () => console.log(`Server is running on port ${port}`))