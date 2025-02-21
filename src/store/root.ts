import watchIncrementAsync from "./saga/counter/counter.ts";
import { watchFetchlist } from "./saga/listApicall/apicall.ts";

  
  // Root Saga
  function* rootSaga() {
    yield watchFetchlist();
    yield watchIncrementAsync();
  }

  export default rootSaga