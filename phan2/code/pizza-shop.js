const EventEmitter = require("node:events")

// định nghĩa lớp Pizzashop kế thừa từ lớp
// EventEmitter
class Pizzashop extends EventEmitter{
    constructor(){
        // gọi phương thức khởi tạo ở lớp cha
        // super() là từ khóa để gọi method khởi
        // tạo của lớp cha cho dù lớp cha đó
        // có là lớp nào đi nữa
        super()
        this.orderNumber = 0
    }

    order(size, topping){
        this.orderNumber++
        this.emit("order", size, topping)
    }

    displayOrderNumber(){
        console.log(`Current order number: ${this.orderNumber}`)
    }
}

module.exports = Pizzashop