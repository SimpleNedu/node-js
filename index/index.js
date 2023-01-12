// note that the fs part helps me async promisify the first readfile action and no error was handled here as this tutorial was more about learning node than handling errors
const fs = require('fs').promises
const fss = require('fs')
const http = require('http')
const url = require('url')
const path = require('path')
const replaceTemplates = require('../modules/replaceTemplates')
const slugify = require('slugify')









//  functions that need to be called once throuoghout the run time of the nodeserver should be listed as a op level function asthis will help make the 
// reduce the workload on the create server function
const data = async() =>{
    return await fs.readFile(path.join(__dirname, '../dev-data/data.json'), 'UTF-8')
}
const dataResponse = data().then((res)=>JSON.parse(res))
const tempOverview = fss.readFileSync(path.join(__dirname, '../templates/overview.html'), 'utf-8');
const tempCard = fss.readFileSync(path.join(__dirname, '../templates/templateCard.html'), 'utf-8');
const tempProduct = fss.readFileSync(path.join(__dirname, '../templates/product.html'), 'utf-8');

const dataResponse2 = dataResponse.then(res=>{
    return res.map(data1=>{
        return {...data1, id: slugify(data1.productName)}
    })
})
// server setup
const server = http.createServer((req, res)=>{
    const  {query, pathname} = url.parse(req.url, true)

    // overview page
    if (pathname === '/' || pathname === '/overview'){
        res.writeHead(200, {"content-type": "text/html"})
        dataResponse.then((res)=>{
            const cardsHtml = res.map(el => replaceTemplates(tempCard, el)).join('')
            theTemp = tempOverview.replace(/{%PRODUCTS_CARDS%}/g, cardsHtml)
            return theTemp
        }).then((resp)=>{
            res.end(resp)
        })

    // product page
    } else if (pathname === '/product') {
        res.writeHead(200, {"content-type": "text/html"})
        
        dataResponse2.then(res=>res.filter(resp=>query.id== resp.id)) 
        .then(([reps])=>replaceTemplates(tempProduct, reps))
        .then((reps)=>res.end(reps))
        
    // api page
    } else if (pathname === '/api') {
        dataResponse.then((resp)=>res.end(JSON.stringify(resp)))
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