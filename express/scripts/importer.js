const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({path: path.join(__dirname, '../config.env')})
const Tour = require('../model/tourModel')

mongoose.set("strictQuery", false)


const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)

mongoose.connect(DB, {
    useNewUrlParser: true
}).then(doc=>{
    console.log("Db creation succesful!!!")
})
.catch(error=>console.log(error))

const tours = JSON.parse(fs.readFileSync(path.join(__dirname, '../public/tours.json'), 'utf-8'))

const importData = async()=>{
    try{
        await Tour.create(tours)
        console.log("database loaded succesfully!")
    } catch(err){
        console.log(err)
    }
    process.exit()
}

const deleteData= async() =>{
    try{
        await Tour.deleteMany()
        console.log("database clear succesfully!")
    } catch(err){
        console.log("backlog clear unsuccesful")
    }
    process.exit()
 }
 if (process.argv[2] === '__import') {
    importData()
 } else if (process.argv[2] === '__delete') {
    deleteData()
 }
