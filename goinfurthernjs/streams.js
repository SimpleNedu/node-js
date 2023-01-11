const fs = require("fs")
const path = require("path")
const server = require("http").createServer();

server.on('request', (req, res)=>{
    // solutiton 1
    // fs.readFile(path.join(__dirname, '../txt/stream.txt'), (err, data)=>{
    //     if (err) console.log(err)
    //     res.end(data)
    // })

    // solution2
    // const readable = fs.createReadStream(path.join(__dirname, '../txt/stream.txt'))
    // readable.on('data',(data)=>{
    //     res.write(data)
    // })
    // readable.on('end', ()=>{
    //     res.end()
    // })
    // readable.on('error', (error)=>{
    //     console.log(error)
    //     res.statusCode = (500);
    //     res.writeHead(404, {
    //         "content-type": "text/html"
    //     })
    //     res.end(' <h1>Error 404</h1><h4>Something went wrong </h4> ')
    // })

    // solution3
    const readable = fs.createReadStream(path.join(__dirname, '../txt/stream.txt'), "utf-8")
    readable.pipe(res)

    readable.on('end', ()=>{
        console.log("request complete")
        server.close()
    })

})
server.listen(8000, '127.0.0.1', ()=>{
    console.log('listening....')
})