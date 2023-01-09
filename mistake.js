
// ////////////////////////////////////////////////

// const synchroniser = (data)=>{
//     const synchronise = async()=>{
//         return await fs.readFile(data, 'utf-8');
//     }
//     return synchronise()
// }
// synchroniser('./txt/start.txt')
// .then((res)=>{
//     const data2 = async() =>{
//         return await fs.readFile(`./txt/${res}.txt`, 'utf-8');
//     }
//     return data2()
// })
// .then((res)=>{
//     const res2 = synchroniser(`./txt/append.txt`)
//     return res2.then((data)=>{
//         return {data2: res, data3: data}
//     })
// })
// .then((res)=>{
//     fs.writeFile('./txt/write2.txt', `${res.data2}____________${res.data3}`)
//     console.log("file write done")
// })
// .catch((err)=>{
//     console.log(`nawa for this error: ${err}`)
//     console.log('i no write again')
// })
    
// console.log('read file')
