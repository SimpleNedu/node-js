const fs = require("fs")
const path = require('path')
const express = require('express');
const app = express();

app.use(express.json());


const tours = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../txt/tours_simple.json'), 'utf-8')
)

app.get('/api/v1/tours', (req, res)=>{
   res.status(200).json({
    status: 'success',
    result: tours.length,
    data: {
        tours
    }
   })
})

app.get('/api/v1/tours/:id', (req, res)=>{
    res.status(200).json({
        status: "success",
        data: tours[req.params.id]
    
    })
})

app.post('/api/v1/tours', (req, res)=>{
    const id = tours[tours.length - 1].id + 1;

    tours.push({
        ...req.body,
        id: id
    })

    
    fs.writeFile(path.join(__dirname, '../txt/tours_simple.json'), JSON.stringify(tours), (err)=>{
        // if (err){
        //     res.status(404).json({
        //         "status": "fail",
        //         "data": "an error occurred"
        //     })
        // }
        res.status(201).json({
            "status": "success",
            "data": {
                tours: tours[tours.length - 1]
            }
        })
    })
    
})

const port = 3000
app.listen(port, ()=>{
    console.log('listening...')
})