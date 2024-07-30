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

// const math = require("./math")

// const {add, subtract} = math
// console.log(add(2,3))
// console.log(subtract(2,3)) 

// importing json and watch mode
// cách bật watch mode node --watch fileName
// const data = require("./data.json")
// console.log(data.name)
// console.log("hahah")

// PATH MODULE
// const path = require("node:path")
// // in ra path filename hiện tại
// console.log(__filename)
// // in ra path dirname hiện tại
// console.log(__dirname)

// // in ra filename
// console.log(path.basename(__filename))
// // in ra dirname
// console.log(path.basename(__dirname))

// // in ra ext của file name
// console.log(path.extname(__filename))
// // in ra ext của dir name (trống vì tên thư mục ko
// // có phần ext)
// console.log(path.extname(__dirname))

// // in ra info của file name
// console.log(path.parse(__filename))
// // format info
// console.log(path.format(path.parse(__filename)))

// // true: nghĩa là đây là 1 đường dẫn tuyệt đối
// console.log(path.isAbsolute(__filename))
// // false: nghĩa là dường dẫn tương đối
// console.log(path.isAbsolute("./data.json"))

// console.log(path.join("folder1", "folder2", "index.html"))
// console.log(path.join("/folder1", "folder2", "index.html"))
// console.log(path.join("/folder1", "//folder2", "index.html"))
// // ../ nghĩa là ta nói nó sẽ nhảy ra ngoài 1 folder
// console.log(path.join("/folder1", "//folder2", "../index.html"))
// console.log(path.join(__dirname, "data.json"))

// console.log()

// // resolve thì nó sẽ tạo dường dẫn tuyệt đối từ đường
// //  dẫn đến thư mục hiện tại cho đến tên hiện tại
// console.log(path.resolve("folder1", "folder2", "index.html"))
// console.log(path.resolve("/folder1", "folder2", "index.html"))
// console.log(path.resolve("/folder1", "//folder2", "index.html"))
// // ../ nghĩa là ta nói nó sẽ nhảy ra ngoài 1 folder
// console.log(path.resolve("/folder1", "//folder2", "../index.html"))
// console.log(path.resolve(__dirname, "data.json"))

// EVENTS MODULE PATR1  
// const EventEmitter = require("node:events");
// const { emit } = require("node:process");
// const emitter = new EventEmitter();

// // event handler: khi sự kiện order-pizza đc gọi
// // thì hàm callback đc gọi
// emitter.on("order-pizza", (size, topping) => {
//     console.log(`Order received! banking a ${size} pizza with ${topping}`)
// })

// emitter.on("order-pizza", (size) => {
//     if(size === 'large'){
//         console.log("Serving complimentary drink")
//     }
// })

// // phát ra sự kiện order-pizza kích hoạt all
// // trình xử lí cho sự kiện này
// // emitter.emit("event", "argument 1", "argument 2")
// emitter.emit("order-pizza", "large", "mushroom")

// EVENTS MODULE PATR2
// const Pizzashop = require('./pizza-shop')
// const DrinkMachine = require('./drink-machine')

// const pizzaShop = new Pizzashop()
// const drinkMachine = new DrinkMachine()


// pizzaShop.on("order", (size, topping) => {
//     console.log(`Order received! Banking a ${size} pizza with ${topping}`)
//     drinkMachine.serveDrink(size)
// })
// pizzaShop.order("large", "mushrooms")
// pizzaShop.displayOrderNumber()

// pizzaShop.order("small", "mushrooms2")
// pizzaShop.displayOrderNumber()

// STREAMS AND BUFFERS
// const buffer = new Buffer.from("Vishwas")
// console.log(buffer.toString())
// console.log(buffer)
// console.log(buffer.toJSON())

// FS (FILE SYSTEM) MODULE PART 1
// const { error } = require("node:console")
// const fs = require("node:fs")

// // nếu mình dùng readFileSync nghĩa là đọc
// // đồng bộ, hiểu đơn giản nó sẽ chờ đến
// // khi đọc sau file này thì mới tới dòng tiếp
// // theo. Nhưng khi gặp file large thì sẽ ảnh
// // hưởng tới hiệu suất
// const fileContents = fs.readFileSync("./file.txt", "utf-8")
// console.log(fileContents) 

// // nếu dùng readFile thì là ko đồng bộ (asyn)
// // trái ngược với cái trên thôi
// // ngoài ra nó nhận 1 callback sẽ đc gọi
// // khi file được đọc
// fs.readFile('./file.txt', "utf-8", (error, data) => {
//     if(error){
//         console.log(error)
//     } else{
//         console.log(data)
//     }
// })

// // ghi nội dung file 1 cách đồng bộ (syn)
// // ghi đè lên nội dung file (overwrite)
// fs.writeFileSync("./greet.txt", "Hello world")

// // ghi nội dung file 1 cách bất đồng bộ (asyn)
// // ghi đè lên nội dung file (overwrite)
// // nhưng nếu ta thêm 1 argument là object {flag: "a"}
// // thì nó sẽ append vào (a ở đây là chế độ append mode)
// fs.writeFile("./greet.txt", " 111 Hello Thế Bảo", {flag: "a"}, (error) => {
//     if(error){
//         console.log(error)
//     } else{
//         console.log("file written")
//     }
// })


// FS (FILE SYSTEM) MODULE PART 2
// const fs = require("node:fs/promises")

// fs.readFile("./file.txt", "utf-8")
//     .then(data => console.log(data))
//     .catch((error) => console.log(error))

// STREAMS MODULES AND PIPES
// tư tưởng của stream là đọc, ghi dữ liệu theo
// từng phần nhỏ. Giống như việc xem youtobe thì
// video sẽ load lên từ từ chứ mình ko cần phải
// chờ để xem toàn bộ video cùng 1 lúc.
// const fs = require("node:fs")
// const zlib = require("node:zlib")

// const gzip = zlib.createGzip()

// const readableStream = fs.createReadStream("./file.txt", {
//   encoding: "utf-8",
//   // mặc định thì mỗi chunk sẽ là 64byte,
//   // nhưng ở đây mình giới hạn là mỗi chunk
//   // là 2 byte để thấy đc sự khác biệt   
//   highWaterMark: 2,
// });

// const writeableStream = fs.createWriteStream("./file2.txt");

// PIPES
// readableStream.pipe(writeableStream)
// readableStream.pipe(gzip).pipe(fs.WriteStream("./txt2.txt.gz"))

// // đầu tiên event data đc phát khi trong file.txt có
// // 1 đoạn dữ liệu để xử lí
// readableStream.on("data", (chunk) => {
//     console.log(chunk)
//     writeableStream.write(chunk)
// })


// HTTP MODULE
// const http = require("node:http")
// const fs = require("node:fs")
// const { error } = require("node:console")

// // tạo 1 server khi có bất kì req nào từ port 3000
// // thì callback sẽ đc thực thi, res lại header
// // là 200 object content-type và kết thúc res
// // bằng việc trả về hello world
// const server = http.createServer((req, res) => {
//     // json response
//     const superHero = {
//         firstName: "Bruce",
//         lastName: "Wayne"
//     }

//     // nếu muốn gửi đi 1 object thì phải chuyển content-type
//     // về dạng application/json, đồng thời chuỗi object
//     // đó về dạng json luôn
//     // json reponse
//     // res.writeHead(200, {"Content-Type": "application/json"})
//     // res.end(JSON.stringify(superHero))

//     // html reponse
//     // res.writeHead(200, {"Content-Type": "text/html"})
//     // cách 1: dùng stream (load data 1 cách từ từ)
//     // fs.createReadStream(__dirname + "/index.html").pipe(res)

//     // cách 2: Nếu sử dụng cách này khi file html lớn thì
//     // sẽ ảnh hưởng đến hiệu năng, bởi vì nó sẽ chờ
//     // load all content của file html 1 lần
//     // const html = fs.readFileSync("./index.html", "utf-8")
//     // res.end(html)
    

//     // {"Content-Type" : "text/plain"}:Giúp máy khách 
//     // hiểu loại nội dung: Khi máy 
//     // khách nhận được phản hồi từ máy chủ, tiêu đề 
//     // Content-Type giúp máy khách xác định cách xử 
//     // lý và hiển thị nội dung.
//     // res.writeHead(200, {"Content-Type" : "text/plain"})
//     // res.end("Hello world")

//     // html template
//     const name = "Thế Bảo Hải"
//     res.writeHead(200, {"Content-type" : "text/html"})
//     let html = fs.readFileSync("./index.html", "utf-8")
//     html = html.replace("{{name}}", name)
//     res.end(html)
// })

// // node js port 3000. lắng nghe req của client từ 
// // port 3000
// server.listen(3000, () => {
//     console.log("Server running on port 3000")
// })



// HTTP ROUTING
// const http = require("node:http")
// const fs = require("node:fs")

// const server = http.createServer((req, res) => {
//     if(req.url === '/'){
//         res.writeHead(200, {"Content-Type" : "text/plain"})
//         res.end("Home page")
//     } else if(req.url ==="/about"){
//         res.writeHead(200, {"Content-Type" : "text/plain"})
//         res.end("About page")
//     } else if(req.url === "/api"){
//         res.writeHead(200, {"Content-Type" : "application/json"})
//         res.end(JSON.stringify({
//             firstName: "Trần Thế",
//             lastName: "Bảo"
//         }))
//     } else{
//         res.writeHead(404)
//         res.end("Page not found")
//     }
// })

// server.listen(3000, () => {
//     console.log("Server running on port 3000")
// })

