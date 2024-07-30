import { upperCase } from "upper-case"
// const upperCase = require("upper-case").upperCase

function greet(name){
    console.log(upperCase(`Hello ${name}, welcom to nodejs`))
}


greet("Thế Bảo")
// module.exports = greet