const newsRouter = require('./news');
const siteRouter = require('./site');

function route(app) {
    // // định nghĩa cái route(tuyến đường)
    // // req(request): chứa những thông tin mà ứng dụng ở phía client gửi lên server
    // // res(respone): trả dữ liệu từ sever về ứng dụng ở phía client. Trả về ntn, trả về cái j
    // //  action --> dispatcher --> function handler (controller in MVC)
    // app.get('/', (req, res) => {
    //     res.render('home')
    // })

    // // định nghĩa cái route(tuyến đường)
    // app.get('/news', (req, res) => {
    //     res.render('news')
    // })

    app.use('/news', newsRouter);
    app.use('/', siteRouter);

    // // định nghĩa cái route(tuyến đường)với method là get
    // app.get('/search', (req, res) => {
    //     console.log(req.query.q)
    //     res.render('search')
    // })

    // // định nghĩa cái route(tuyến đường)với method là post
    // app.post('/search', (req, res) => {
    //     // lấy dữ liệu phương thức get trả về 1 object và ta đang lấy value của key q
    //     // console.log(req.query.q)

    //     // lấy dữ liệu phương thức post trả về 1 object
    //     console.log(req.body)
    //     res.render('search')
    // })
}

module.exports = route;
