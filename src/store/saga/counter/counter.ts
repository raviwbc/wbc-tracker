import { delay, put, takeLatest } from "redux-saga/effects";
import { increment, incrementAsync } from "../../reducers/counter.ts";

function* handleIncrementAsync() {
    yield delay(1000); // Simulate async delay
    yield put(increment()); // Dispatch the increment action
  }
  
  // Watcher Saga
  function* watchIncrementAsync() {
    yield takeLatest(incrementAsync.type, handleIncrementAsync);
  }
  export default watchIncrementAsync
