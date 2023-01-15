// 1) IMPORTS
const express = require('express');
const morgan = require('morgan')
const app = express();
const userRouter = require('./routes/user')
const tourRouter = require('./routes/tour')

// 2) MIDDLEWARES
app.use(express.json());
app.use(morgan('dev'))
app.use((req, res, next) =>{
    console.log('my middleware bitch')
    next()
})
app.use(express.static(`${__dirname}/public`))

app.use((req, res, next) =>{
    req.time = new Date().toDateString()
    next()
})



// mounting the router for different use cases
app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)

module.exports = app