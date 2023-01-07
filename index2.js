const fs = require('fs')

// non synchronous and non blocking code
// fs.readFile('./txt/start.txt', 'utf-8', (err, data)=>{
//     fs.readFile(`./txt/${data}.txt`, 'utf-8', (err, data2)=>{
//         console.log(data2)
//         fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3)=>{
//             console.log(data3)
//             fs.writeFile('./txt/write.txt', `${data2} _____________________________________________________ ${data3}`, ()=>{
//                 console.log('okay we wrote it now')
//             })
//         })
//     })
// })

const synchroniser = async()=>{
    return await fs.readFile('./txt/start.txt', 'utf-8');
}
synchroniser()
.then(res=>{
    const data2 = async() =>{
        return await fs.readFile(`./txt/${res}.txt`, 'utf-8');
    }
    return data2()
})
// .then(res=>{
//     const data3 = async()=>{
//         return await fs.readFile('./txt/append.txt', 'UTF-8');
//     }
    // return res
// }).then(res=>{
//     // console.log(res)
//     // fs.writeFile('./txt/onyenkem.txt', `${res.data2}___________________${res.data3}`)
// })
    
console.log('read file')