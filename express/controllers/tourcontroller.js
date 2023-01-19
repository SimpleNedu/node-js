const fs= require('fs')
const path = require("path")

const tours = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../../txt/tours_simple.json'), 'utf-8')
)

exports.getAllTours =  (req, res)=>{
    res.status(200).json({
        status: 'success',
        result: tours.length,
        data: {
            tours
        }
    })
 }

 exports.validateId = (req, res, next, value) => {

    if (value > tours.length) {
        return res.status(404).json({
           "status": "sucess",
            "data": "invalid id for tour"
        })
    }
    next()
 }

 exports.validatePostData = (req, res, next)=>{
    if (!req.body.name || !req.body.price) {
        return res.status(404).json({
            "status": "fail",
            "data": "bad request"
        })
    }
    next()
}

 exports.getTour = (req, res)=>{
    
    res.status(200).json({
        "status": "success",
        "date": req.time,
        "data": tours[req.params.id]
    
    })
}

exports.createTour = (req, res)=>{
    const id = tours[tours.length - 1].id + 1;

    tours.push({
        ...req.body,
        id: id
    })
    
    fs.writeFile(path.join(__dirname, '../../txt/tours_simple.json'), JSON.stringify(tours), (err)=>{
        if (err){
            return res.status(404).json({
                "status": "fail",
                "data": "an error occurred"
            })
        }
        res.status(201).json({
            "status": "success",
            "data": {
                tours: tours[tours.length - 1]
            }
        })
    })
    
}

exports.updateTour = (req,res)=>{
    const id = Number(req.params.id)
    const tour = tours.find(el=>el.id === id)
    
    const tours2 = tours.map(data => {
        if (id === data.id) {
            return {...req.body, id: id};
        }
        return data
    })
    fs.writeFile(path.join(__dirname, '../../txt/tours_simple.json'), JSON.stringify(tours2), err=>{
        if (err) {
            return res.status(404).json({
                "status": "fail",
                "data": "an error occurred"
            })
        }
        res.status(200).json({
            "status": "success",
            "data": {
                tours: tours2
            }
        })
    })

}

exports.deleteTour = (req,res)=>{
    const id = Number(req.params.id)
    const tour = tours.find(el=>el.id === id)
   
    res.status(204).json({
        "status": "success",
        "data": null
    })
}

