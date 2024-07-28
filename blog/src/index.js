const express = require('express');
const app = express();
const port = 3000;

const morgan = require('morgan');

const handlebars = require('express-handlebars');
const path = require('path');

// nó sẽ đi vòa folder routes và tự động lấy ra file index
const route = require('./routes');

// app.use: Phương thức này được sử dụng để áp dụng một
// middleware trong ứng dụng Express. Middleware có thể
// xử lý yêu cầu HTTP trước khi chúng được chuyển
// đến các route hoặc sau khi chúng được xử lý

// express.static(): Đây là một middleware được tích hợp
// sẵn trong Express để phục vụ các tài nguyên tĩnh.
// Nó sẽ cố gắng tìm kiếm các tệp tĩnh trong thư mục
// được chỉ định và gửi chúng về client khi yêu cầu.

// path.join(__dirname, 'resources/public'): là join đường dẫn
// tới file hiện tại (__dirname) với resources/public
app.use(express.static(path.join(__dirname, 'public')));

console.log(path.join(__dirname, 'resources/public'));
// run website ở cái port nào

// để console.log ra những cái request từ phía client lên sever (http logger)
// app.use(morgan('combined'))

// template engine
// dòng dưới nghĩa là mình sẽ sử dụng engine là handlebars và tên nó là handlebars
// extname: 'hbs' để configure nó từ handlebars thành hbs (đuôi mở rộng và 1 vài thứ khác thành hbs)
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
    }),
);
// dòng dưới set cho app sử dụng view engine của handlebars
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

// __dirname: trả về dường dẫn của file hiện tại

// đây là middleware để xử lí dữ liệu từ method post từ client web lên
app.use(
    express.urlencoded({
        extended: true,
    }),
);

// đây là middleware để xử lí dữ liệu từ fect, axios gửi lên, jvs
app.use(express.json());

// routes init
route(app);

app.listen(port, () =>
    console.log(`example app listening at http://localhost:${port}`),
);
