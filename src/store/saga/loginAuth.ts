import { call, put, takeLatest } from "redux-saga/effects";
import { loginFailed, loginRequest, loginSuccess } from "../reducers/auth.ts";
import { login } from "../api-call/jsonapi.ts";
import { startLoading, stopLoading } from "../reducers/loader.ts"
interface LoginAction {
    type: string;
    payload: { username: string; password: string };
}

function* loginAPICall(action: LoginAction) {
    try {
        yield put(startLoading());  
        const response = yield call(login, action.payload); 
        
        if (response?.data) {
            yield put(loginSuccess(response.data));  
        } else {
            yield put(loginFailed("Invalid response from server"));
        }
    } catch (err: any) {
        const errorMessage = err?.message || "Login failed due to an unknown error";
        yield put(loginFailed(errorMessage));  
    }finally {
        yield put(stopLoading());     // <<< stop loader
      }
}

export function* watchLoginAuth() {
    yield takeLatest(loginRequest.type, loginAPICall);
}
