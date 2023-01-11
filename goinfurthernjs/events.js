const EventEmitter = require('events')
const http = require("http");
const url = require('url');

class sales extends EventEmitter{
    constructor(){
        super();
    }
}

const myemitter = new sales;

myemitter.on("newSale", ()=>{
    console.log("new sale i emitted")
})

myemitter.on("newSale", ()=>{
    console.log("the sale don happen again")
})

myemitter.on("newSale", stock=>{
    console.log(`they don by ${stock} out of the number of products instock`)
})

myemitter.emit("newSale", 20)

//////////////////////////////
const server = http.createServer()
server.on("request", (req, res)=>{
    console.log('request resceived')
    res.end('request received')
})
server.on("request", (req, res)=>{
    console.log('serious with da code metricsd')
    console.log('request received 🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈')
    setTimeout(() => {
        server.close()
    }, 1000);
})
server.on("close", ()=>{
    console.log('server, closed')
})
server.listen(8000, "127.0.0.1", ()=>console.log('waiting for request...'))
