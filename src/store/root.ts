import watchIncrementAsync from "./saga/counter/counter.ts";
import { watchFetchlist } from "./saga/listApicall/apicall.ts";
import { watchLoginAuth } from "./saga/loginAuth.ts";
import { watchManualEntryRequest } from "./saga/manualEntrySaga.ts";

  
  // Root Saga
  function* rootSaga() {
    yield watchLoginAuth();
    yield watchFetchlist();
    yield watchIncrementAsync();
    yield watchManualEntryRequest();
    
  }

  export default rootSaga