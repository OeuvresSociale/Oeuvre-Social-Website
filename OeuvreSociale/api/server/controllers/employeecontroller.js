//from new branch
const Employee = require("../models/user");
//Get all employees
const getEmployees = async (req, res) => {
  try {
    const Employees = await Employee.find().select("idEmployee");
    res.status(200).json(Employees);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
//get one
const getEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id).select(
      "-password "
    );

    res.status(200).json(employee);
  } catch (err) {
    res.status(500).json(err);
  }
};
//create
const addEmployee = async (req, res) => {
  const newEmployee = new Employee(req.body);
  try {
    const saveEmployee = await newEmployee.save();
    res.status(200).json(saveEmployee);
    console.log("employee has been created");
  } catch (error) {
    // Handle other errors
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
//update
const updateEmployee = async (req, res) => {
    try {
      const employee = await Employee.findById(req.params.id);
      if (!employee) {
        return res.status(404).json({ error: "Employee not found" });
      }
  
      // Function to check for duplicate fields
      const checkDuplicate = async (field, value, errorMessage) => {
        const existingEmployee = await Employee.findOne({ [field]: value , _id: { $ne: req.params.id }});
        if (existingEmployee) {
          throw new Error(errorMessage);
        }
      };
  
      // Check for duplicate fields
      await checkDuplicate("idEmployee", req.body.idEmployee, "idEmployee already exists");
      await checkDuplicate("email", req.body.email, "Email already exists");
      await checkDuplicate("phoneNumber", req.body.phoneNumber, "Phone number already exists");
      await checkDuplicate("bankAccount", req.body.bankAccount, "Bank account already exists");
  
      // Update the employee
      const updatedEmployee = await Employee.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      ).select(
        "-password ");
      res.status(200).json(updatedEmployee);
      console.log("Employee has been updated");
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message || "Internal server error" });
    }
  };
  
  
//delete
const deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.status(200).json("Employee has been deleted");
    console.log("Employee has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};
//pagenation & search
const getEmployeepage = async (req, res) => {
  //current page
  const page = req.query.page || 1;
  const EmployeesPerPage = 10;
  const skipEmployees = (page - 1) * EmployeesPerPage;
const search=req.query.search || "";
  try {
    const Employees = await Employee.find({
      $or: [
        { idEmployee: { $regex: search } },
        { familyName: { $regex: search } },
        { firstName: { $regex: search } },
        { role: { $regex: search } },
      ],
    })
      .select("idEmployee familyName firstName email role monthlySalary")
      .skip(skipEmployees)
      .limit(EmployeesPerPage);
    res.status(200).json(Employees);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
module.exports = {
  getEmployees,
  getEmployee,
  addEmployee,
  deleteEmployee,
  updateEmployee,
  getEmployeepage,
};
