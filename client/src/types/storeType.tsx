export type employee = {
    _id: string
    name: string,
    dateOfBirth: string,
    gender: string,
    salary: number
}

interface storyType {
    employees: employee[]
}
export default storyType