import { configureStore, UnknownAction } from "@reduxjs/toolkit";
import reducer from './reducer.ts'
import createSagaMiddleware from "redux-saga";
import rootSaga from "./root.ts";



const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer : reducer,
    middleware : (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga);
