const fs = require('fs');
const fss = require('fs').promises;
const path = require('path')
const superaget = require('superagent')
const server = require('http').createServer()

// call back hell
// fs.readFile(path.join(__dirname, '../../../txt/dog.txt'), 'utf-8', (req, res)=>{
//     console.log(`breed: ${res}`)
//     superaget
//     .get(`https://dog.ceo/api/breed/${res}/images/random`)
//     .end((err, data)=>{
//         if (err) return console.log(err)
//         fs.writeFile(path.join(__dirname, '../../../txt/dogtext.txt'), data.body.message, (err)=>{
//             if (err) return console.log(err)
//             console.log('Dog image gotten successfully')
//         })
//     })
// })

// promisified by me
const data = async()=> {
    return await fss.readFile(path.join(__dirname, '../../../txt/dog.txt'), 'utf-8')
}
const dog_data = data()
.then((res)=>{
    return superaget.get(`https://dog.ceo/api/breed/${res}/images/random`)
})
.then(res=>{
    console.log(res.body.message)
    return fs.writeFile(path.join(__dirname, '../../../txt/dog2text.txt'), res.body.message, ()=>console.log("file load succesful"))
})
.catch(err=>{
    console.log(`Error: ${err.message}`)
})



server.on('request', (req, res)=>{
})

server.listen(8000, '127.0.0.1', ()=>{
    console.log('listening...')
})