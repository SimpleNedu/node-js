// console.log(arguments)
// console.log(require("module").wrapper)
const calc = require("./testmodule1");

const calculator1 = new calc;
console.log(calculator1.divide(525,5))



// exports
const {add, multiply, divide, subtract} = require('./testmodule2')
console.log(add(2, 5))
console.log(divide(2, 5))
console.log(subtract(2, 5))
console.log(multiply(2, 5))


// caching
require('./testmodule3')();
require('./testmodule3')();
require('./testmodule3')();
