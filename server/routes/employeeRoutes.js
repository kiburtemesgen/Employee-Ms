import express from "express"
import { allEmployees, createEmployee, deleteEmployee, updateEmployee } from "../controllers/employeeController.js"
const router = express.Router()


router.route('/create').post(createEmployee)
router.route('/all').get(allEmployees)
router.route('/update').patch(updateEmployee)
router.route('/delete/:id').delete(deleteEmployee)

export default router