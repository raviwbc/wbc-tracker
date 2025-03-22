import { combineReducers } from "redux";
import { counterReducer } from "./reducers/counter.ts";
import { postListReducer } from "./reducers/titleList.ts";
import { trackerReducer } from "./reducers/timeTracker.ts";
import { loginValidation } from "./reducers/auth.ts";


const rootReducer = combineReducers({
    counterReducer,
    postListReducer,
    trackerReducer,
    loginValidation
})

export default rootReducer