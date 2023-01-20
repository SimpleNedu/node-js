const mongoose = require('mongoose') //first of all import the mongoose 
const dotenv = require('dotenv')
dotenv.config({path: './config.env'})

const app = require('./app')

// after that mark the paart to the database you want to useand apply authentication in case of an online database
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)
mongoose.set("strictQuery", false);

// connect the app to the database
mongoose.connect(DB, {
    useNewUrlParser: true,
}).then(con=>{
    // activities that will require to be done in the mongoose should go here
    console.log('DP up and running..')
}).catch(err=>console.log(err))

const port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log(`app running on port ${port}...`)
})