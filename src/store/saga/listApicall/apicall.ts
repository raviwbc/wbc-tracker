import { call, put, takeLatest } from "redux-saga/effects"
import { fetchPostsAPI } from "../../api-call/jsonapi.ts"
import { apiSuccess, apifailed, fetchPostsRequest } from "../../reducers/titleList.ts"



function* fetchList(){
    try{
    const resp = yield call(fetchPostsAPI)
    yield put(apiSuccess(resp.data))
    }
    catch(err){
        yield put(apifailed(err.message))
    }
}

export function* watchFetchlist(){
    yield takeLatest(fetchPostsRequest.type, fetchList)
}