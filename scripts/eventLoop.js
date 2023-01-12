const fs = require('fs')
const path = require('path')
const crypto = require("crypto");
const start = Date.now()

// process.env.UV_THREADPOOL_SIZE = 1;

setTimeout(() => {
    console.log("timer 1 finished")
}, 0);
setImmediate(()=> console.log("immediate finished"))
fs.readFile(path.join(__dirname, `../txt/append.txt`), 'UTF-8', ()=>{
    console.log('___________________-')

    setTimeout(() => {    console.log("timer 2 finished") }, 0);
    setTimeout(() => {    console.log("timer 4 finished") }, 3000);
    setTimeout(() => {    console.log("timer 3 finished") }, 20);
    setImmediate(() => {    console.log("immediate 2 finished") });


    process.nextTick(()=>setTimeout(() => {console.log("tnext tick in") }, 19))

    crypto.pbkdf2Sync("password", 'salt', 100000, 1024, "sha512")
    console.log(Date.now()- start, "password encrypted")

    crypto.pbkdf2Sync("password", 'salt', 100000, 1024, "sha512")
    console.log(Date.now()- start, "password encrypted")

    crypto.pbkdf2Sync("password", 'salt', 100000, 1024, "sha512")
    console.log(Date.now()- start, "password encrypted")

    crypto.pbkdf2Sync("password", 'salt', 100000, 1024, "sha512")
    console.log(Date.now()- start, "password encrypted")

})

console.log("hello from the tp level code")