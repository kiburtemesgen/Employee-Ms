import { employee } from "./storeType";

export interface createEmployeeAction {
  type: "CREATE_EMPLOYEE";
  employee: employee;
}
export interface updateEmployeeAction {
  type: "UPDATE_EMPLOYEE";
  employee: employee;
}

export interface deleteEmployeeAction {
  type: "DELETE_EMPLOYEE";
  id: string;
}

export interface getEmployees {
    type: "GET_EMPLOYEES";
}

export interface createdEmployeeAction {
  type: "CREATED_EMPLOYEE",
  employee: employee
}

export interface updatedEmployeeAction{
  type: "UPDATED_EMPLOYEE",
  employee: employee
}

export interface deletedEmployeeAction{
  type: "DELETED_EMPLOYEE",
  id: string
}


export interface gotEmployees {
  type: "GOT_EMPLOYEES",
  employees: employee[]
}

export const actionIds = {
  CREATE_EMPLOYEE: "CREATE_EMPLOYEE",
  UPDATE_EMPLOYEE: "UPDATE_EMPLOYEE",
  DELETE_EMPLOYEE: "DELETE_EMPLOYEE",
  GET_EMPLOYEES: "GET_EMPLOYEES"
};
