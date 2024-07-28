const express = require('express');
const router = express.Router();

// import news controller từ file NewsController.js vào
const siteController = require('../app/controllers/SiteController');

// phải cho những tuyết đường detail hơn lên trước
router.use('/search', siteController.search);
// '/' được hiểu là tuyến đường đầu tiên chọc vào newsRoutes
router.use('/', siteController.index);

module.exports = router;
