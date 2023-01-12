// console.log(arguments)
// console.log(require("module").wrapper)
const calc = require("./testmodule1");

const calculator1 = new calc;
console.log(calculator1.divide(525,5))

