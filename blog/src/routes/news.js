const express = require('express');
const router = express.Router();

// import news controller từ file NewsController.js vào
const newsController = require('../app/controllers/NewsController');

// phải cho những tuyết đường detail hơn lên trước
router.use('/:slug', newsController.show);
// '/' được hiểu là tuyến đường đầu tiên chọc vào newsRoutes
router.use('/', newsController.index);

module.exports = router;
