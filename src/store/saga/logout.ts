import { call, put, takeLatest } from "redux-saga/effects";
import { logoutRequest, logoutsuccess, logoutFailed } from "../reducers/logout.ts";
import { logout } from "../api-call/jsonapi.ts";
import { startLoading, stopLoading } from "../reducers/loader.ts";


function* logoutAPICall() {
    try {
         yield put(startLoading());  
        const response = yield call(logout);
        if (response?.data) {
            yield put(logoutsuccess(response.data));  
        } else {
            yield put(logoutFailed("Invalid response from server"));
        }
    } catch (err: any) {
        const errorMessage = err?.message || "Login failed due to an unknown error";
        yield put(logoutFailed(errorMessage));  
    }finally{
        yield put(stopLoading());  
    }
}

export function* watchLogout() {
    yield takeLatest(logoutRequest.type, logoutAPICall);
}
