const mongoose = require('mongoose') //first of all import the mongoose  

//create 
const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'a tour must have a name'],
        unique: true,
        trim: true
    },
    ratingsAverage: {
        type: Number,
        default: 4.5
    },
    ratings: {
        type: Number,
        default: 0
    },
    duration: {
        type: Number,
        required: [true, "a tour must have a duration"]
    },
    maxGroupSize: {
        type: String,
        required: [true, "a tour must have a group size"]
    },
    difficulty: {
        type: String,
        required: [true, "a tour must have a difficulty range"]
    },
    price: {
        type: Number,
        required: [true, "a tour must have a price"]
    },
    priceDiscount: Number,
    summary: {
        type: String,
        trim: true,
        required: [true, "a tour should have a summaryy"]
    },
    imageCover: {
        type: String,
        required: [true, "a tour must have a cover image"]
    },
    images: [String],
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    },
    StartDates: [Date]
}) 

// create a new collection which models input data from the values added above  
const Tour = mongoose.model("tour", tourSchema)

module.exports = Tour