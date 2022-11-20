import expressAsync from "express-async-handler";
import Employee from "../models/employeeModel.js";

const createEmployee = expressAsync(async (req, res) => {
  const { name, dateOfBirth, gender, salary } = req.body.employee;

  const employee = await Employee.create({
    name,
    dateOfBirth,
    gender,
    salary,
  });

  if (!employee) {
    throw new Error("can not create a employee");
  }

  res.status(201).json({
    id: employee._id,
    name: employee.name,
    dateOfBirth: employee.dateOfBirth,
    gender: employee.gender,
    salary: employee.salary,
  });
});

const allEmployees = expressAsync(async (req, res) => {
  const employees = await Employee.find();
  res.status(200).json(employees);
});

const updateEmployee = expressAsync(async (req, res) => {
  const employee = await Employee.findById(req.body.employee._id);
  if (!employee) {
    res.status(404);
    throw new Error("employee not found");
  }

  const { name, dateOfBirth, gender, salary } = req.body.employee;

  employee.name = name || employee.name;
  employee.dateOfBirth = dateOfBirth || employee.dateOfBirth;
  employee.gender = gender || employee.gender;
  employee.salary = salary || employee.name;

  const updatedEmployee = await employee.save();

  res.status(201).json({
    _id: updatedEmployee._id,
    name: updatedEmployee.name,
    dateOfBirth: updatedEmployee.dateOfBirth,
    gender: updatedEmployee.gender,
    salary: updatedEmployee.salary,
  });
});

const deleteEmployee = expressAsync(async (req, res) => {
  const { id } = req.params;
  const employee = await Employee.findById(id);
  if (!employee) {
    res.status(404);
    throw new Error("employee not found");
  }
  await employee.remove();
  res.status(202).json({
    id: id,
  });
});

export { createEmployee, allEmployees, updateEmployee, deleteEmployee };
