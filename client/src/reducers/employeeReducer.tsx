import { Reducer } from "redux";
import { createdEmployeeAction, createEmployeeAction, deletedEmployeeAction, deleteEmployeeAction, getEmployees, gotEmployees, updatedEmployeeAction, updateEmployeeAction } from "../types/actionsType";
import { employee } from "../types/storeType";

type actions = 
    | createdEmployeeAction
    | deletedEmployeeAction
    | updatedEmployeeAction
    | gotEmployees


const initialState: employee[] = []

const employeeReducer: Reducer<employee[], actions> = (
    state = initialState,
    action
) => {
    switch(action.type){
        case "CREATED_EMPLOYEE":
            return[...state, action.employee]
       case "GOT_EMPLOYEES":
        return [...state, ...action.employees]
       case "DELETED_EMPLOYEE":
        return [...state.filter((employee) => employee.id !== action.id)]
        case "UPDATED_EMPLOYEE":
            console.log("manye");
            console.log(action.employee.id)
            console.log(state[0].id)

        return [...state.map((employee) => employee.id === action.employee.id ? action.employee : employee)]
       default:
        return [...state] 
    }
}

export default employeeReducer