import axios from "axios"

const employeeApi = axios.create({
    baseURL: "employees"
})

export default employeeApi