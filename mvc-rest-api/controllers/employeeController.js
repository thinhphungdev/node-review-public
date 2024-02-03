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
  const employee = data.employees.find(
    (employee) => employee.id === parseInt(req.body.id)
  );

  const { firstname, lastname } = req.body;

  if (!employee)
    return res.status(400).json({
      message: `Employee ID ${req.body.id} not found`,
    });

  const updatedEmployee = {
    firstname: firstname || employee.firstname,
    lastname: lastname || employee.lastname,
    id: employee.id,
  };

  const removedOldEmployeeArray = data.employees.filter(
    (employee) => employee.id !== parseInt(req.body.id)
  );

  const unsortedArray = removedOldEmployeeArray.push(updatedEmployee);
  data.setEmployees(
    unsortedArray.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
  );

  res.json(data.employees);
}

function deleteEmployee(req, res) {
  const employee = data.employees.find(
    (employee) => employee.id === +req.body.id
  );

  if (!employee)
    return res.status(400).json({
      message: `Employee ID ${req.body.id} does not exist`,
    });

  const filteredArray = data.employees.filter(
    (employee) => employee.id !== req.body.id
  );

  data.setEmployees([...filteredArray]);

  res.json(data.employees);
}

function getEmployee(req, res) {
  const employee = data.employees.find(
    (employee) => employee.id === +req.body.id
  );

  if (!employee)
    return res.status(400).json({
      message: `Employee ID ${req.body.id} does not exist`,
    });

  res.json(employee);
}

module.exports = {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};
