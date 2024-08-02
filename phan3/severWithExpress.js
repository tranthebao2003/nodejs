
const express = require('express')
const app = express()
const path = require('node:path')
const {logger} = require('./middleware/logEvents')
const PORT = process.env.PORT || 3500

// custom middleware logger
// Cách hoạt động của middleware 
// trong Express là chỉ cần cung cấp hàm 
// middleware, và Express sẽ gọi hàm đó với các đối 
// số phù hợp. Ở đây ta thấy ko cần truyền đối số
// next, res, req nhưng logger vẫn chạy được
app.use(logger);

// app.use: để tích hợp middleware
// build- in middleware to handle urlencoded data
// in other words, from data:
// 'content-type: appplication/x-www-form-urlencoded'
// đặt dữ liệu phân tích vào req.body
app.use(express.urlencoded({extended: false}))

// build-in middleware for json
// đặt dữ liệu phân tích vào req.body
app.use(express.json())

// serve static files
// express.static() là một middleware tích hợp 
// trong Express, được sử dụng để phục vụ các tệp 
// tĩnh từ một thư mục cụ thể.
app.use(express.static(path.join(__dirname, '/public')))

// define route xử lí cá request GET đến đường 
// dẫn '/' (trang chủ). Hàm callback sẽ được gọi
// mỗi khi có request đến dường dẫn này

// phần (.html)? đã giải thích ở dưới
// ^: đế bắt đầu chuỗi, $ kết thúc chuỗi, / là đại
// diện cho dấu gách chép trong url
// ^/$: nghĩa là nó phải kết thúc bằng dấu gách chéo
// | toán tử or trong regex nghĩa là nó cho khớp
// vs 1 trong 2 pattern
app.get('^/$|/index(.html)?', (req, res) => {
    // cách 1: res.sendFile('./views/index.html', {root: __dirname})
    // cách 2:
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

// /new-page là phần tính còn 
// (.html)? là 1 regex: phần (.html) là 1 capturing group
// chứa hmtl. phần ? làm cho phần trước đó là optional.
// nghĩa là khi kết hợp lại (.html)? thì phần html có
// thể có hoặc không
app.get('/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'))
})

app.get('/old-page(.html)?',(req, res) => {
    // 302 by default
    // but i want 301 because 301 is permanently
    res.redirect(301, '/new-page(.html)?') 
})

// Rount handlers 
app.get('/hello(.html)?', (req, res, next) => {
    console.log('attempted to load hello.html')
    // next() chuyển qua middleware function tiếp theo
    // trong stack cụ thể là function phía dưới và
    // trả về client Hello World!. Hoặc có cách
    // dưới
    next()
}, (req, res) => {
    res.send('Hello World!')
})

// chaining route handlers
const one = (req, res, next) => {
    console.log('one')
    next()
}

const two = (req, res, next) => {
    console.log('two')
    next()
}

const three = (req, res, next) => {
    console.log('three')
    res.send('Finished')
}

app.get('/chain(.html)?', [one, two, three])

// /*: là regex khớp với all route sau dấu gạch chéo
// Nghĩa là, mọi yêu cầu GET đến bất kỳ URL nào mà 
// không khớp với các tuyến đường khác đều sẽ được xử 
// lý bởi tuyến đường này. Dùng để customize 404
app.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
})

app.listen(PORT, () =>
  console.log(`Server with express running on port ${PORT}`)
);