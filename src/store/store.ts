import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducer.ts';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './root.ts';

// Create saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configure store
export const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

// Run the root saga
sagaMiddleware.run(rootSaga);
