import { all } from "redux-saga/effects";
import watchIncrementAsync from "./saga/counter/counter.ts";
import { watchFetchlist } from "./saga/listApicall/apicall.ts";
import  watchManualEntryRequest  from "./saga/manualEntrySaga.ts";
import { fork } from "redux-saga/effects";

  
  // Root Saga
  function* rootSaga() {
    try {
      yield all([
        fork(watchFetchlist),
        fork(watchManualEntryRequest),
        fork(watchIncrementAsync),
      ]);
    } catch (error) {
      console.error('🔥 Saga error:', error);
    }
  }

  // function* rootSaga() {
  //   yield all([
  //     fork(watchFetchlist),
  //     fork(watchManualEntryRequest),
  //     fork(watchIncrementAsync),
  //   ]);
    // yield watchManualEntryRequest();
    //   yield watchFetchlist();
    //   yield watchIncrementAsync();
      
    
  // }

  
  export default rootSaga