import { call, put, takeLatest } from "redux-saga/effects";
import {ManualEntryRequest,enterySuccess, Entryfailure} from '../reducers/manualEntry.ts'
import { postManualEntry } from "../api-call/jsonapi.ts";


function* postManualEntryData(action){
    try{
        let data = yield call(postManualEntry, action.payload)
        yield put(enterySuccess(data));
    }catch(err){
        yield put(Entryfailure(err.message))
    }
}

 function* watchManualEntryRequest() {
    yield takeLatest(ManualEntryRequest.type, postManualEntryData)
    
}
export default watchManualEntryRequest