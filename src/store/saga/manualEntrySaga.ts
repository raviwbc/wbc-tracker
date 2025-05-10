import { call, put, takeLatest } from "redux-saga/effects";
import {ManualEntryRequest,enterySuccess, Entryfailure, AutoEntryRequest, AutoEntryfailure, AutoEntryStopSuccess, AutoEntryStopfailure, AutoEntryStopRequest, AutoEntrySuccess} from '../reducers/manualEntry.ts'
import { autoEntryApi, autoEntrystopApi, postManualEntry } from "../api-call/jsonapi.ts";
import { startLoading, stopLoading } from "../reducers/loader.ts";


function* postManualEntryData(action){
    try{
        //  yield put(startLoading());  
        let data = yield call(postManualEntry, action.payload)
        yield put(enterySuccess(data));
    }catch(err){
        yield put(Entryfailure(err.message))
    }finally{
        //  yield put(stopLoading());  
    }
}

export function* watchManualEntryRequest() {
    yield takeLatest(ManualEntryRequest.type, postManualEntryData)
    
}
 

function* postAutoEntryData(action){
    try{
        console.log('ss')
        //  yield put(startLoading());  
        let data = yield call(autoEntryApi, action.payload)
        yield put(AutoEntrySuccess(data));
    }catch(err){
        yield put(AutoEntryfailure(err.message))
    }
}

export function* watchAutoEntryRequest() {
    yield takeLatest(AutoEntryRequest.type, postAutoEntryData)
}
 


function* postAutoEntryStop(action){
    try{
        //  yield put(startLoading());  
        let data = yield call(autoEntrystopApi, action.payload)
        yield put(AutoEntryStopSuccess(data));
    }catch(err){
        yield put(AutoEntryStopfailure(err.message))
    }finally{
        //  yield put(stopLoading());  
    }
}

export function* watchAutoEntryStopRequest() {
    yield takeLatest(AutoEntryStopRequest.type, postAutoEntryStop)
    
}
 