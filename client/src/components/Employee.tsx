import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createEmployee,
  deleteEmployee,
  getEmployees,
  updateEmployee,
} from "../action";
import { RootState } from "../store";
import { employee } from "../types/storeType";
import { FormGroup, Input, Label } from "./Forms";
import StyledButton from "./StyledButton";

const Employee: React.FC = () => {
  const dispatch = useDispatch();
  let employeeList: employee[];
  employeeList = useSelector<RootState, employee[]>((state) => state.employees);

  const [name, setName] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const [gender, setGender] = useState<string>("Male");
  const [salary, setSalary] = useState<number>(1);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [id, setId] = useState<string>("");
  const [addEmployee, setAddEmployee] = useState<boolean>(false);

  // console.log(employeeList);

  useEffect(() => {
    dispatch(getEmployees());
  }, [dispatch]);

  let createEmployeeHandler = function (): void {
    let newEmployee: employee = {
      _id: new Date().toString(),
      name,
      dateOfBirth: dateOfBirth,
      gender,
      salary,
    };
    setAddEmployee(false);
    dispatch(createEmployee(newEmployee));
  };

  let deleteEmployeeHandler = function (id: string): void {
    dispatch(deleteEmployee(id));
  };

  let updateEmployeeHandler = function (): void {
    let editedEmployee: employee = {
      _id: id,
      name,
      dateOfBirth: dateOfBirth,
      gender,
      salary,
    };
    setAddEmployee(false);
    dispatch(updateEmployee(editedEmployee));
    setIsUpdating(false);
  };

  let editEmployeeHandler = function (employee: employee): void {
    setIsUpdating(true);
    setAddEmployee(true);
    setName(employee.name);
    setDateOfBirth(employee.dateOfBirth.slice(0, 10));
    setGender(employee.gender);
    setSalary(employee.salary);
    setId(employee._id);
  };

  return (
    <div>
      {addEmployee && (
        <div>
          <br></br>
          <FormGroup>
            <form>
              <div className="form-group">
                <Label>Name: </Label>
                <Input
                  placeholder="Name"
                  name="name"
                  className="form-control"
                  value={name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className="form-group">
                <Label>Date Of Birth: </Label>
                <Input
                  type="date"
                  placeholder="Date Of Birth"
                  name="dateOfBirth"
                  className="form-control"
                  value={dateOfBirth}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setDateOfBirth(e.target.value);
                  }}
                />
              </div>
              <div className="form-group">
                <Label> Gender: </Label>
                <Input
                  type="radio"
                  value="Male"
                  name="gender"
                  onChange={() => {
                    setGender("Male");
                  }}
                  checked={gender === "Male" || gender === ""}
                />{" "}
                <Label>Male</Label>
                <Input
                  type="radio"
                  value="Female"
                  name="gender"
                  onChange={() => {
                    setGender("Female");
                  }}
                  checked={gender === "Female"}
                />{" "}
                <Label>Female</Label>
              </div>
              <Label>Salary: </Label>
              <Input
                type="text"
                placeholder="Salary"
                name="salary"
                className="form-control"
                value={salary}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setSalary(Number(e.target.value));
                }}
              />

              {isUpdating ? (
                <StyledButton mainColor="blue" onClick={updateEmployeeHandler}>
                  Update
                </StyledButton>
              ) : (
                <StyledButton mainColor="green" onClick={createEmployeeHandler}>
                  Save
                </StyledButton>
              )}
              <StyledButton
                mainColor="red"
                style={{ marginLeft: "10px" }}
                onClick={() => {
                  setAddEmployee(false);
                }}
              >
                Cancel
              </StyledButton>
            </form>
          </FormGroup>
        </div>
      )}
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {!addEmployee && (
            <StyledButton
              mainColor="green"
              style={{ width: "25%" }}
              onClick={() => {
                setAddEmployee(true);
              }}
            >
              {" "}
              Add Employee
            </StyledButton>
          )}
        </div>
        <br></br>
        <h2 className="text-center">Employees List</h2>
        <div
          style={{ padding: "20px", display: "flex", justifyContent: "center" }}
        >
          <table>
            <thead>
              <tr style={{ borderBottom: "2px solid black" }}>
                <th style={{ paddingRight: "35px" }}> Name</th>
                <th style={{ paddingRight: "35px" }}> Gender</th>
                <th style={{ paddingRight: "35px" }}> Salary</th>
                <th style={{ paddingRight: "35px", textAlign: "center" }}>
                  {" "}
                  Actions
                </th>
              </tr>
            </thead>
            {employeeList.map((employee) => (
              <tbody key={employee._id}>
                <tr style={{ borderBottom: "1px solid black" }}>
                  <td> {employee.name} </td>
                  <td> {employee.gender}</td>
                  <td> {employee.salary}</td>
                  <td>
                    <StyledButton
                      mainColor="blue"
                      onClick={() => editEmployeeHandler(employee)}
                    >
                      Update
                    </StyledButton>
                    <StyledButton
                      mainColor="red"
                      onClick={() => deleteEmployeeHandler(employee._id)}
                    >
                      Delete
                    </StyledButton>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Employee;
