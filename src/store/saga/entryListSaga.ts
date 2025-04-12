import { call, put, takeLatest } from "redux-saga/effects"
import { completedEntryList } from "../api-call/jsonapi.ts"
import { completedEntryFailure, completedEntryRequest, completedEntrySuccess } from "../reducers/todayCompletedList.ts"
import { AxiosError } from "axios"




 function* entrylistGet(action){    
    try{
        const resp = yield call(completedEntryList, action.payload)        
        if(resp.data){
            yield put(completedEntrySuccess(resp.data.model))
        }else{
            yield put(completedEntryFailure('Something went wrong try again'))    
        }
        
    }
    catch(e){
        yield put(completedEntryFailure(e.message))
    }

}

export function* watchEntryListGet(){
    yield takeLatest(completedEntryRequest.type, entrylistGet)
}