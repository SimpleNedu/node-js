const fs= require('fs')
const path = require("path")
const Tour = require('../model/tourModel') 

// for creating a new tour in the server
exports.createTour = async(req, res)=>{
    try {
        // can be done thios way but we prefer to use async await and an easier way kwa
    // const newTour = new Tour({...req.body})
    // newTour.save()
    // .then(doc=>console.log(doc))
    // .catch(err=>console.log(err))
    // return res.status(200).json({
    //     "status": "success"
    // })
        const newTour = await Tour.create(req.body)
        
        res.status(201).json({
            "status": "success",
            "data": {
                "tours": req.body
            }
        })
    } catch (error) {
        res.status(400).json({
            "status": "fail", 
            // note in a real appplication you must handle your errors well, but for now go by the below
            "message": error
        })
    }
}

// for getting all our tours in the server
exports.getAllTours =  async(req, res)=>{
    try {
        // BUILD QUERY
        // 1) FILTERING
        const queryObj = {...req.query};
        const exclude = ['sort', 'limit', 'fields', 'page']
        exclude.forEach(el=> delete queryObj[el])

        // 2) ADVANCED FILTERING
        let queryStr = JSON.stringify(queryObj)
        queryStr = JSON.parse(queryStr.replace(/\b(lte|lt|gte|gt)\b/g, match=>`$${match}`))

        // this receives the value of the fuiltered object and .find()method always return a query
        let query = Tour.find(queryStr)

        // 3)SORTING
        if (req.query.sort){
            const sortBy = req.query.sort.split(',').join(' ')
            query = query.sort(sortBy)
        } else{
            query = query.sort('-createdAt')
        }

        // 4) limiting number of fields
        if (req.query.fields){
            const fields = req.query.fields.split(',').join(' ')
            console.log(fields)
            query = query.select(fields)
        } else{
            query = query.select('-__v')
        }

        // PAGINATION
        const limit = req.query.limit
        const page = req.query.page
        const skip = (page-1)* limit

        query = query.skip(skip).limit(limit)
        if (req.query.page){
            const data = await Tour.countDocuments()
            if (skip >= data) throw Error('page does not exist')
        }

        // EXECUTE QUERY
        const tours = await query;

        res.status(200).json({
            status: 'success',
            data: {
                tours
            }
        })
    } catch (error) {
        res.status(400).json({
            "status": "fail",
            "message": error
        })
    }
    
 }

 exports.getTour = async(req, res)=>{
    try {
    // this first method is kinda manual, we use mongoDb built in mode of searching by id
        // const tour = await Tour.find({"_id": req.params.id})
        const tour = await Tour.findById(req.params.id)

        res.status(200).json({
            "status": "success",
            "data": tour
        })

    } catch (error) {
        res.status(400).json({
            "status": "fail",
            "message": "getting tour failed, try again later"
        })
    }
}


exports.updateTour = async(req,res)=>{
    try {
        // if you still want to use the data fro the await below, you can cache it in a const?
        await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        res.status(200).json({
            status: "success",
            data: {"update": req.body}
        })
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: error
        })
    }
}

exports.deleteTour = async(req,res)=>{
    try {
        // if you still want to use the data fro the await below, you can cache it in a const?
        await Tour.findByIdAndDelete(req.params.id)

        res.status(204).json({
            status: "success",
            data: "delete actio successful"
        })
    } catch (error) {
        res.status(500).jsn({
            status: "fail",
            message: "delete action failed"
        })
    }
}

////////////////////////////////////////
// always remember that once a filter and sort has been arranged with an initial function its easier to aplly those filytering with the help of middlewares than querying with a different fnction
exports.getBestTour = async(req, res, next) =>{
    req.query.limit = 5;
    req.query.sort = '-ratingsAverage,price'
    req.query.fields = 'name,price,ratingsAverage,destination,duration'

    next()
}

