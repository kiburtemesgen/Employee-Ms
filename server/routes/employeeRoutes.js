import express from "express"
import { allUsers, createUser, deleteUser, updateUser } from "../controllers/employeeController.js"
const router = express.Router()


router.route('/create').post(createUser)
router.route('/all').get(allUsers)
router.route('/update').patch(updateUser)
router.route('/delete/:id').delete(deleteUser)

export default router