import { call, put, takeLatest } from "redux-saga/effects"
import { completedEntryList, deleteTask } from "../api-call/jsonapi.ts"
import { completedEntryFailure, completedEntryRequest, completedEntrySuccess, deleteFailer, deleteRequest, deleteSuccess } from "../reducers/todayCompletedList.ts"
import { AxiosError } from "axios"
import { startLoading, stopLoading } from "../reducers/loader.ts";




 function* entrylistGet(action){
    try{
         yield put(startLoading());  
        const resp = yield call(completedEntryList, action.payload)        
        if(resp.data){
            yield put(completedEntrySuccess(resp.data.model))
        }else{
            yield put(completedEntryFailure('Something went wrong try again'))    
        }
        
    }
    catch(e){
        yield put(completedEntryFailure(e.message))
    }finally{
        yield put(stopLoading());  
    }
}
function* deleteTaskDel(action){    
    try{
         yield put(startLoading());  
        const resp = yield call(deleteTask, action.payload)        
        if(resp.data){
            console.log(resp)
            yield put(deleteSuccess(resp.data))
        }else{
            yield put(deleteFailer('Something went wrong try again'))    
        }
        
    }
    catch(e){
        yield put(deleteFailer(e.message))
    }finally{
        yield put(stopLoading());  
    }
}

export function* watchEntryListGet(){
    yield takeLatest(completedEntryRequest.type, entrylistGet)
}

export function* watchDeleteDelete(){
    yield takeLatest(deleteRequest.type, deleteTaskDel)
}