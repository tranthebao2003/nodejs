// const addFn = require('./add')

// console.log('Hello from index.js')
// const sum = addFn (1,2)
// const sum2 = addFn (1,6)
// console.log(sum)
// console.log(sum2)

// require("./batman")
// require("./superman")

// const superHero = require("./super-hero")
// console.log(superHero.getName())
// superHero.setName("Superman")
// console.log(superHero.getName())

// const newSuperHero = require('./super-hero')
// console.log(newSuperHero.getName())

// const SuperHero = require("./super-hero")
// const batman = new SuperHero("Batman")
// console.log(batman.getName())
// batman.setName("Bruce Wayne")
// console.log(batman.getName())

// const superman = new SuperHero("Superman")
// console.log(superman.getName())

const math = require("./math")

const {add, subtract} = math
console.log(add(2,3))
console.log(subtract(2,3)) 