const fs = require('fs').promises
const fss = require('fs')
const http = require('http')
const url = require('url')

//  functions that need to be called once throuoghout the run time of the nodeserver should be listed as a op level function asthis will help make the 
// reduce the workload on the create server function
const data = async() =>{
    return await fs.readFile('./dev-data/data.json', 'UTF-8')
}
const dataResponse = data()

/////////////////////////////////////////////////////////
// server setup
// for trhe html templates added below, the same theory as above hold to prvent repitition ad stress on the system that has to reload the html files on every reload
const tempOverview = fss.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8');
const tempCard = fss.readFileSync(`${__dirname}/templates/templateCard.html`, 'utf-8');
const tempProduct = fss.readFileSync(`${__dirname}/templates/product.html`, 'utf-8');

const server = http.createServer((req, res)=>{
    const pathName = req.url;

    // overview page
    if (pathName === '/' || pathName === '/overview'){
        res.writeHead(200, {"content-type": "text/html"})
        res.end(tempOverview)

    // product page
    } else if (pathName === '/product') {
        res.end('we are at the product section')


    // api page
    } else if (pathName === '/api') {
        dataResponse.then((response)=>{
            const data = JSON.parse(response)
            res.end(JSON.stringify(data))
        })
        .catch((err)=>{
            res.writeHead(404, {
                "content-type": "text/html",
                'error': 404
            })
            res.end('<h1>Error 404!</h1><h5>Something went wrong!</h5>')
        })

    // page not found error
    } else{
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-header': 'hello world!'
        })
        res.end('<h1>Error 404!</h1><h5>page not found</h5>')
    }
});
server.listen(8000, '127.0.0.1', ()=>{
    console.log('server started, listening to request on port 8000')
});