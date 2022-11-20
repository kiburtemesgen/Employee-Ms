import expressAsync from "express-async-handler";
import { now } from "mongoose";

const createUser = expressAsync(async (req, res) => {
  const { employee } = req.body;
  const { name, dateOfBirth, gender, salary } = employee;

  console.log(req.body);
  console.log(employee);
  res.status(201).json({
    id: now().toISOString(),
    name: name,
    dateOfBirth: dateOfBirth,
    gender: gender,
    salary: salary,
  });
});

const allUsers = async (req, res) => {
  console.log("all user route get hitted");
  res.status(200).json([
    {
      id: "2022-11-19T20:44:50.209Z",
      name: "jan",
      dateOfBirth: "1992-11-11",
      gender: "Male",
      salary: "12333",
    },
    {
      id: "2022-11-19T20:45:50.209Z",
      name: "kb",
      DateOfBirth: "1992-10-10",
      gender: "male",
      salary: "14333",
    },
  ]);
};

const updateUser = async (req, res) => {
  console.log("update user route get hitted");
  console.log(req.body)
  const { employee } = req.body;

  const { id,name, dateOfBirth, gender, salary } = employee;
  console.log(employee);

  res.status(200).json({
    "id": id,
    "name": name,
    "dateOfBirth": dateOfBirth,
    "gender": gender,
    "salary": salary
  })
};

const deleteUser = async (req, res) => {
  console.log("delete user route get hitted");
 const {id} = req.params;
  res.status(202).json({
    id: id,
  });
};

export { createUser, allUsers, updateUser, deleteUser };
