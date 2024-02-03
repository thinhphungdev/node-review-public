const data = {
  employees: require('../model/employee.json'),
  setEmployees: function (data) {
    this.employees = data;
  },
};

function getAllEmployees(req, res) {
  res.json(data.employees);
}

function createNewEmployee(req, res) {
  const newEmployee = {
    id: data?.employees[data.employees.length - 1]?.id + 1 || 1,
    firstName: req.body.firstName,
    lastname: req.body.lastName,
  };

  if (!newEmployee.firstName || !newEmployee.lastname) {
    return res.status(400).json({
      message: 'First name and last name are required',
    });
  }

  data.setEmployees([...data.employees, newEmployee]);
  res.status(201).json(data.employees);
}

function updateEmployee(req, res) {
  res.json({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  });
}

function deleteEmployee(req, res) {
  res.json({ id: req.body.id });
}

function getEmployee(req, res) {
  res.json({ id: req.params.id });
}

module.exports = {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};
