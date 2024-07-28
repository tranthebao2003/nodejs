class NewsController {
    // [GET] / news
    index(req, res) {
        res.render('news');
    }

    // [GET] /new:slug(là parameters ngẫu nhiên trên url)
    show(req, res) {
        res.send('NEWS DETAIL!!');
    }
}

// tạo 1 object và xuất ra ngoài
module.exports = new NewsController();
