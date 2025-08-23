import { call, put, takeLatest } from "redux-saga/effects"
import { fetchPostsAPI, getProjectList } from "../../api-call/jsonapi.ts"
import { apiSuccess, apifailed, fetchPostsRequest } from "../../reducers/titleList.ts"
import { projectListFailed, ProjectListRequest, projectListSuccess } from "../../reducers/timeTracker.ts"
import { startLoading, stopLoading } from "../../reducers/loader.ts"



function* fetchList(){
    try{
    const resp = yield call(fetchPostsAPI)
    yield put(apiSuccess(resp.data))
    }
    catch(err){
        yield put(apifailed(err.message))
    }
}

function* fetchProjectList(){
    try{
         yield put(startLoading());  
        const resp = yield call(getProjectList)
        
        yield put(projectListSuccess(resp.data))
    }catch(e){
        yield put(projectListFailed(e.message))
    }finally{
        yield put(stopLoading())
    }
}

export function* watchFetchlist(){
    yield takeLatest(ProjectListRequest.type, fetchProjectList)
}