import mongoose from "mongoose"


const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    dateOfBirth: {
        type: Date,
    },
    gender: {
        type: String,
    },
    rating: {
        type: Number
    }
})

const Employee = mongoose.model('Employee', employeeSchema)
export default Employee