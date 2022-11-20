import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/database.js"
import employeeRoutes from './routes/employeeRoutes.js'


dotenv.config()
connectDB()

const app = express()
app.use(express.json())

app.use("/employees", employeeRoutes)



const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));