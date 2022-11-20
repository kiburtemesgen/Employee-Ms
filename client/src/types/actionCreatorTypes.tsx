import {
    createEmployeeAction,
    updateEmployeeAction,
    getEmployees,
    deleteEmployeeAction,
} from "./actionsType"
import { employee } from "./storeType"


export type createEmployeeActionCreator = (employee: employee) => createEmployeeAction
export type updateEmployeeActionCreator = (employee: employee) => updateEmployeeAction
export type deleteEmployeeActionCreator = (id: string) => deleteEmployeeAction
export type getEmployeesActionCreator = () => getEmployees