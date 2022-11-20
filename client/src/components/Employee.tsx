import { time } from "console";
import { now } from "mongoose";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createEmployee, deleteEmployee, getEmployees, updateEmployee } from "../action";
import { RootState } from "../store";
import { employee } from "../types/storeType";

const Employee: React.FC = () => {
  const dispatch = useDispatch();
  let employeeList: employee[];
  employeeList = useSelector<RootState, employee[]>((state) => state.employees);
  console.log("from Employee componeent");
  console.log(employeeList);

  const [name, setName] = useState<string>("")
  const [dateOfBirth, setDateOfBirth] = useState<string>("")
  const [gender, setGender] = useState<string>("")
  const [salary, setSalary] = useState<number>(1)
  const [isUpdating, setIsUpdating] = useState<boolean>(false)
  const [id, setId] = useState<string>("")

  useEffect(() => {
    dispatch(getEmployees())
  }, [dispatch])


  let createEmployeeHandler = function(): void {
     
    let newEmployee: employee = {id: (new Date()).toString(), name, dateOfBirth: dateOfBirth, gender, salary}
    dispatch(createEmployee(newEmployee))
  }

  let deleteEmployeeHandler = function(id: string): void {
    dispatch(deleteEmployee(id))
  }

  let updateEmployeeHandler = function() : void {
    let editedEmployee: employee = { id, name, dateOfBirth: dateOfBirth, gender, salary}
    dispatch(updateEmployee(editedEmployee))
    setIsUpdating(false)
  }

  let editEmployeeHandler = function(employee: employee) : void {
    setIsUpdating(true)
    setName(employee.name)
    setDateOfBirth(employee.dateOfBirth)
    setGender(employee.gender)
    setSalary(employee.salary)
    setId(employee.id)
  }





  return (
    <div>
      <div className="create-user">
        <h3>Create New Employee</h3>
        <input type="text" placeholder="Enter your name"  value={name} onChange={(e)=>{setName(e.target.value)}} />

        <input type="text" placeholder="Date of Birth" value={dateOfBirth} onChange={(e)=>{setDateOfBirth(e.target.value)}} />

        <input type="text" placeholder="Gender" value={gender} onChange={(e)=>{setGender(e.target.value)}} />

        <input type="text" placeholder="Salary" value={salary} onChange={(e)=>{setSalary(Number(e.target.value))}} />
        <br />
       {isUpdating ? <button onClick={updateEmployeeHandler}>Update</button> : <button onClick={createEmployeeHandler}>Create</button>}
      </div>
      {employeeList.map((employee: employee) => {
        return (
          <div key={employee.id}>
            <h3>{employee.name}</h3>
            <button onClick={() => editEmployeeHandler(employee)}>Edit</button>
            <button onClick={() =>deleteEmployeeHandler(employee.id)}>delete</button>
          </div>
        );
      })}
    </div>
  );
};

export default Employee;
