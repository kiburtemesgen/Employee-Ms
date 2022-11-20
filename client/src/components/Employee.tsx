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
      {/* <div className="create-user">
        <h3>Create New Employee</h3>
        <input type="radio" value="Male" name="gender" /> Male
        <input type="radio" value="Female" name="gender" /> Female
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />

        <input
          type="date"
          placeholder="Date of Birth"
          value={dateOfBirth}
          onChange={(e) => {
            setDateOfBirth(e.target.value);
          }}
        />

        <input
          type="text"
          placeholder="Gender"
          value={gender}
          onChange={(e) => {
            setGender(e.target.value);
          }}
        />

        <input
          type="text"
          placeholder="Salary"
          value={salary}
          onChange={(e) => {
            setSalary(Number(e.target.value));
          }}
        />
        <br />
        {isUpdating ? (
          <button onClick={updateEmployeeHandler}>Update</button>
        ) : (
          <button onClick={createEmployeeHandler}>Create</button>
        )}
      </div> */}
      {addEmployee && (
        <div>
          <br></br>
          <div className="container">
            <div className="row">
              <div className="card col-md-6 offset-md-3 offset-md-3">
                Create Employee
                <div className="card-body">
                  <form>
                    <div className="form-group">
                      <label>Name: </label>
                      <input
                        placeholder="Name"
                        name="name"
                        className="form-control"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <label>Date Of Birth: </label>
                      <input
                        type="date"
                        placeholder="Date Of Birth"
                        name="dateOfBirth"
                        className="form-control"
                        value={dateOfBirth}
                        onChange={(e) => {
                          setDateOfBirth(e.target.value);
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <label className="mx-3"> Gender: </label>
                      <input
                        className="ml-3"
                        type="radio"
                        value="Male"
                        name="gender"
                        onChange={(e) => {
                          setGender("Male");
                        }}
                        checked={gender === "Male" || gender === ""}
                      />{" "}
                      Male
                      <input
                        className="mx-3"
                        type="radio"
                        value="Female"
                        name="gender"
                        onChange={(e) => {
                          setGender("Female");
                        }}
                        checked={gender === "Female"}
                      />{" "}
                      Female
                    </div>
                    <label>Salary: </label>
                    <input
                      type="text"
                      placeholder="Salary"
                      name="salary"
                      className="form-control"
                      value={salary}
                      onChange={(e) => {
                        setSalary(Number(e.target.value));
                      }}
                    />

                    {isUpdating ? (
                      <button
                        className=" my-3 btn btn-success"
                        onClick={updateEmployeeHandler}
                      >
                        Update
                      </button>
                    ) : (
                      <button
                        className=" my-3 btn btn-success"
                        onClick={createEmployeeHandler}
                      >
                        Save
                      </button>
                    )}
                    <button
                      className="btn btn-danger"
                      style={{ marginLeft: "10px" }}
                      onClick={() => {
                        setAddEmployee(false);
                      }}
                    >
                      Cancel
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div>
        <div className="row d-flex justify-content-center">
          {!addEmployee && (
            <button
              className=" btn btn-primary justify-content-end"
              style={{ width: "25%" }}
              onClick={() => {
                setAddEmployee(true);
              }}
            >
              {" "}
              Add Employee
            </button>
          )}
        </div>
        <br></br>
        <h2 className="text-center">Employees List</h2>
        <div className="row px-5">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th> Name</th>
                <th> Gender</th>
                <th> Salary</th>
                <th> Actions</th>
              </tr>
            </thead>
            <tbody>
              {employeeList.map((employee) => (
                <tr key={employee._id}>
                  <td> {employee.name} </td>
                  <td> {employee.gender}</td>
                  <td> {employee.salary}</td>
                  <td>
                    <button
                      onClick={() => editEmployeeHandler(employee)}
                      className="btn btn-info"
                    >
                      Update{" "}
                    </button>
                    <button
                      style={{ marginLeft: "10px" }}
                      onClick={() => deleteEmployeeHandler(employee._id)}
                      className="btn btn-danger"
                    >
                      Delete{" "}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* {employeeList.map((employee: employee) => {
        return (
          <div key={employee._id}>
            <h3>{employee.name}</h3>
            <button onClick={() => editEmployeeHandler(employee)}>Edit</button>
            <button onClick={() => deleteEmployeeHandler(employee._id)}>
              delete
            </button>
          </div>
        );
      })} */}
    </div>
  );
};

export default Employee;
