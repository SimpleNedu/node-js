const express = require('express');

const app = express();

app.get('/', (req, res)=>{
    res.status(404).json({
        app: "Notours",
        message: 'express set up bitch, hello from the server side'
    })
})

app.post('/', (req, res) =>{
    res.send('you can post to this url')
})

const port = 3000
app.listen(port, ()=>{
    console.log(`server running at port ${port}`)
})