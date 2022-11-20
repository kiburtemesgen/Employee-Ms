import {combineReducers} from "redux"

import employeeReducer from "./employeeReducer"

const store = {
    employees: employeeReducer
}

export default combineReducers(store)