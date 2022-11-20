import { createEmployeeActionCreator, deleteEmployeeActionCreator, getEmployeesActionCreator, updateEmployeeActionCreator } from "../types/actionCreatorTypes";
// import { getEmployees } from "../types/actionsType";
// import { deleteEmployeeAction, getEmployeeAction } from "../types/actionsType";


export const createEmployee: createEmployeeActionCreator = (employee) => {
    return {
        type: "CREATE_EMPLOYEE",
        employee,
    }
}

export const deleteEmployee: deleteEmployeeActionCreator =  (id) => {
    return {
        type: "DELETE_EMPLOYEE",
        id,
    }
}

export const updateEmployee: updateEmployeeActionCreator = (employee) => {
    return {
        type: "UPDATE_EMPLOYEE",
        employee
    }
}

export const getEmployees: getEmployeesActionCreator = () => {
    return {
        type: "GET_EMPLOYEES",
    }
}
