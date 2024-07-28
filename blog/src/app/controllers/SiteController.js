class SiteController {
    // [GET] / news
    index(req, res) {
        res.render('home');
    }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}

// tạo 1 object và xuất ra ngoài
module.exports = new SiteController();
