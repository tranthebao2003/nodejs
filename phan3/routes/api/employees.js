const express = require('express')
const router = express.Router()
const {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
} = require("../../controllers/employeesController");

// Đoạn mã này sử dụng express.Router() để định 
// nghĩa các tuyến đường xử lý các yêu cầu HTTP 
// (GET, POST, PUT, DELETE) cho cùng một URL, cụ thể 
// là URL /
router.route('/') 
    .get(getAllEmployees)
    .post(createNewEmployee)
    .put(updateEmployee)
    .delete(deleteEmployee)


// /:id2 là một tuyến đường động trong Express. 
// Dấu hai chấm (:) trước id2 chỉ ra rằng id2 là một 
// tham số động trong URL.

// Bất kỳ giá trị nào nằm ở vị trí của :id 
// trong URL sẽ được lưu trữ trong req.params.id2
router.route('/:id2')
    .get(getEmployee)

module.exports = router