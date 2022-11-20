import { Reducer } from "redux";
import { createdEmployeeAction, deletedEmployeeAction, gotEmployees, updatedEmployeeAction } from "../types/actionsType";
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
        return [...state.filter((employee) => employee._id !== action.id)]
        case "UPDATED_EMPLOYEE":

        return [...state.map((employee) => employee._id === action.employee._id ? action.employee : employee)]
       default:
        return [...state] 
    }
}

export default employeeReducer