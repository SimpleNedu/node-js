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
            "message": "Invalid data sent"
        })
    }
}

// for getting all our tours in the server
exports.getAllTours =  async(req, res)=>{
    try {
        const tours = await Tour.find()

        if (!tours.length) {
            return res.status(400).json({
                "status": "fail",
                "message": 'there are no tours yet'
            })
        }
        res.status(200).json({
            status: 'success',
            data: {
                tours
            }
        })
    } catch (error) {
        res.status(400).json({
            "status": "fail",
            "message": 'request unsuccessful'
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

