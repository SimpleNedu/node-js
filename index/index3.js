// modules required
const http = require('http')
const fsP = require('fs').promises
const path = require('path')
const url = require('url')

// working functions
const api1 = async() =>{
    return await fsP.readFile(path.join(__dirname,`../dev-data/mgbu.json`))
}
const api = api1().then(res=>JSON.parse(res))
// server loaded up
const server = http.createServer((req, res)=>{
 const {pathname} = url.parse(req.url, true)
    
    if (pathname === '/api') {

        api.then(response=>{
            res.writeHead(200, {
                "content-type": "text/html"
            })
            res.end(JSON.stringify(response))
        })
        .catch(err=>{
            console.log(err)
            res.writeHead(200, {
                "content-type": "text/html",
                "error": 404
            })
            res.end('<div><h4>Error 404</h4> <h6>SomeThing went wrong</h6></div>')
        })

    }   else if (pathname === '/') {
        res.writeHead(200, {
            "content-type": "text/html"
        })
        res.end('<div><h1>Welcome to my page</h1><a href="/api">view my <abbr title="application programming interface">API</abbr></a></div>')
    } else{
        res.writeHead(200, {
            "content-type": "text/html",
            "error": 404
        })
        res.end('<div><h4>Error 404</h4> <h6>Page not found</h6></div>')
    }

})
server.listen(8000, ()=>console.log('server started'))