import watchIncrementAsync from "./saga/counter/counter.ts";
import { watchFetchlist } from "./saga/listApicall/apicall.ts";
import { watchManualEntryRequest } from "./saga/manualEntrySaga.ts";

  
  // Root Saga
  function* rootSaga() {
    yield watchFetchlist();
    yield watchIncrementAsync();
    yield watchManualEntryRequest();
  }

  export default rootSaga