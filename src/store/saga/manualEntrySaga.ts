import { call, put, takeLatest } from "redux-saga/effects";
import {ManualEntryRequest,enterySuccess, Entryfailure} from '../reducers/manualEntry.ts'
import { postManualEntry } from "../api-call/jsonapi.ts";


function* postManualEntryData(){
    try{
        let data = yield call(postManualEntry)
        yield put(enterySuccess(data));
    }catch(err){
        yield put(Entryfailure(err.message))
    }
}

export function* watchManualEntryRequest() {
    yield takeLatest(ManualEntryRequest.type, postManualEntryData)
    
}