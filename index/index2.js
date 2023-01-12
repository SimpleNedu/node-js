const fs = require('fs');
const path = require('path')


const text = fs.readFileSync(path.join(__dirname, '../txt/index.txt'), 'utf-8');
console.log(text)

const textOut = `this is what we know about the avocado ${text}. \nCrreated on ${new Date().toDateString()}`
fs.writeFileSync('./txt/output.txt', textOut)
console.log('file hasbeen written')

const readamagain = fs.readFileSync(path.join(__dirname, '../txt/output.txt'), 'UTF-8')
console.log(readamagain)