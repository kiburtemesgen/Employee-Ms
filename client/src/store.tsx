import { applyMiddleware, createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import reducers from "./reducers"
import createSagaMiddlware from "redux-saga";
import employeeSaga from "./sagas/employeeSaga"


const sagaMiddlware = createSagaMiddlware();



const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(sagaMiddlware))
  )
  export type RootState = ReturnType<typeof store.getState>
  sagaMiddlware.run(employeeSaga)


  export default store