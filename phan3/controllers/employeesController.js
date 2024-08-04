const data = {
    employees:require('../model/employees.json'),
    setEmployees: function(data) {this.employees = data}
}

const getAllEmployees = (req, res) => {
    // response 1 json data
    res.json(data.employees)
}

const createNewEmployee = (req, res) => {
    // response 1 json là 1 object
    // với firstname: res(request).body.firstname
    // trong đó res.body có thể được thông qua
    // để lấy all có trong body mà client đã ghi
    res.json({
        "firstname": req.body.firstname,
        "lastname": req.body.lastname
    })
}

const updateEmployee = (req, res) => {
    // tương tự post
    res.json({
        "firstname": req.body.firstname,
        "lastname": req.body.lastname
    })
}

const deleteEmployee = (req, res) => {
    // phản hồi lại giá trị của key id trong body
    res.json({"id": req.body.id})
}

const getEmployee = (req, res) => {
    res.json({"id2" : req.params.id2})
}

module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}