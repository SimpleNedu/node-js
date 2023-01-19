// 1) IMPORTS
const express = require('express');
const morgan = require('morgan')
const app = express();
const userRouter = require('./routes/user')
const tourRouter = require('./routes/tour')

// 2) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
    // all the dependencies that can be handled as dev dependencies and middleware properties that shpuld not go on ojce deploy starts can be handled here to avoid mistakes
    app.use(morgan('dev'))
    app.use((req, res, next) =>{
        console.log('my middleware bitch')
        next()
    })
}
app.use(express.json());

app.use(express.static(`${__dirname}/public`))

app.use((req, res, next) =>{
    req.time = new Date().toDateString()
    next()
})



// mounting the router for different use cases
app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)

module.exports = app