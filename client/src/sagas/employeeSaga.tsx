import { takeEvery, put, call, StrictEffect } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import employeeApi from "../api/employee-api";
import {
  actionIds,
  createdEmployeeAction,
  deletedEmployeeAction,
  gotEmployees,
  updatedEmployeeAction,
} from "../types/actionsType";
import {
  createEmployeeAction,
  updateEmployeeAction,
  deleteEmployeeAction,
} from "../types/actionsType";

function* employeeSaga(): Generator<StrictEffect> {
  yield takeEvery(actionIds.CREATE_EMPLOYEE, createEmployeeWorker);
  yield takeEvery(actionIds.GET_EMPLOYEES, getEmployeeWorker);
  yield takeEvery(actionIds.UPDATE_EMPLOYEE, updateEmployeeWorker);
  yield takeEvery(actionIds.DELETE_EMPLOYEE, deleteEmployeeWorker);
}

function* createEmployeeWorker({ employee }: createEmployeeAction) {
  console.log("from saga create Employee");
  try {
    const response: AxiosResponse = yield call(employeeApi.post, "/create", {
      employee: employee,
    });

    console.log(response.data);

    switch (response.status) {
      case 201:
        const data: createdEmployeeAction = {
          type: "CREATED_EMPLOYEE",
          employee: response.data,
        };

        yield put(data);
    }
  } catch (e) {}
}
function* getEmployeeWorker() {
  const response: AxiosResponse = yield call(employeeApi.get, "/all");
  switch (response.status) {
    case 200:
      const data: gotEmployees = {
        type: "GOT_EMPLOYEES",
        employees: response.data,
      };
      yield put(data);
  }
}

function* updateEmployeeWorker({ employee }: updateEmployeeAction) {
  const response: AxiosResponse = yield call(employeeApi.patch, "/update", {
    employee: employee
  });
  const data: updatedEmployeeAction = {
    type: "UPDATED_EMPLOYEE",
    employee: response.data,
  };
  yield put(data);
}

function* deleteEmployeeWorker({ id }: deleteEmployeeAction) {
  const response: AxiosResponse = yield call(employeeApi.delete, `/delete/${id}`, );
  const data: deletedEmployeeAction = {
    type: "DELETED_EMPLOYEE",
    id: response.data.id,
  };
  yield put(data);
}

export default employeeSaga;
