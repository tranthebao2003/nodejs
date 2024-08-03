
const express = require('express')
const app = express()
const path = require('node:path')
const {logger} = require('./middleware/logEvents')
const errorHandler = require('./middleware/errorHandler')
const cors = require('cors')

const PORT = process.env.PORT || 3500

// custom middleware logger
// Cách hoạt động của middleware 
// trong Express là chỉ cần cung cấp hàm 
// middleware, và Express sẽ gọi hàm đó với các đối 
// số phù hợp. Ở đây ta thấy ko cần truyền đối số
// next, res, req nhưng logger vẫn chạy được
app.use(logger);

// third party middleware
// khi truy cập từ những domain, live sever, localhost thì được phép
// truy cập vào tài nguyên
// liên quan đến bảo mật, tạm thời bỏ qua
const whitelist = ['https://www.google.com', ' http://192.168.1.4:5500', 'http://localhost:3500']
const coresOptions = {
    origin: (origin, callback) => {
        // những danh sách nào ko có trong danh
        // hoặc !origin có thể truy cập resourse
        // vì !origin nghĩa là false undefine
        // mik đang trong giai đoạn phát triển
        // thì header mình là undefined
        if(whitelist.indexOf(origin) !== -1 || !origin){
            callback(null, true)
        } else{
            callback(new Error('Not allowed by CORS'))
        }
    },
    optionSuccessStatus: 200
}
app.use(cors(coresOptions))

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
app.use('/',express.static(path.join(__dirname, '/public')))
app.use('/subdir',express.static(path.join(__dirname, '/public')))

// use Express Router
// Điều này có nghĩa là bất kỳ yêu cầu nào bắt đầu 
// với /subdir sẽ được xử lý bởi các tuyến đường được 
// định nghĩa trong module ./routes/subdir
app.use('/', require('./routes/root'))
app.use('/subdir', require('./routes/subdir'))
app.use('/employees', require('./routes/api/employees'))



// // Route handlers 
// app.get('/hello(.html)?', (req, res, next) => {
//     console.log('attempted to load hello.html')
//     // next() chuyển qua middleware function tiếp theo
//     // trong stack cụ thể là function phía dưới và
//     // trả về client Hello World!. Hoặc có cách
//     // dưới
//     next()
// }, (req, res) => {
//     res.send('Hello World!')
// })

// // chaining route handlers
// const one = (req, res, next) => {
//     console.log('one')
//     next()
// }

// const two = (req, res, next) => {
//     console.log('two')
//     next()
// }

// const three = (req, res, next) => {
//     console.log('three')
//     res.send('Finished')
// }

// app.get('/chain(.html)?', [one, two, three])

// /*: là regex khớp với all route sau dấu gạch chéo
// Nghĩa là, mọi yêu cầu GET đến bất kỳ URL nào mà 
// không khớp với các tuyến đường khác đều sẽ được xử 
// lý bởi tuyến đường này. Dùng để customize 404
// app.get('/*', (req, res) => {
//     res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
// })

// hoặc mình có thể dùng app.all mà ko cần dùng regex
// để bắt lỗi 404
// Trong Express được sử dụng để định nghĩa một 
// middleware cho tất cả các phương thức HTTP 
// (get, ,post, put, del, ) và tất 
// cả các đường dẫn URL mà không được định nghĩa trước 
// đó. Khi không có tuyến đường nào khác khớp với yêu 
// cầu, middleware này sẽ được gọi và trả về một trang 
// lỗi 404.

app.all("*", (req, res) => {
  res.status(404);
  // Đoạn mã này xử lý yêu cầu dựa trên định dạng 
  // (format) mà máy khách chấp nhận (thông qua header 
  // Accept) và trả về phản hồi phù hợp (HTML, JSON, 
  // hoặc văn bản thuần)
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type('txt').send('404 Not Found')
  }
});

app.use(errorHandler)

app.listen(PORT, () =>
  console.log(`Server with express running on port ${PORT}`)
);