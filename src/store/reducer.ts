import { combineReducers } from "redux";
import { counterReducer } from "./reducers/counter.ts";
import { postListReducer } from "./reducers/titleList.ts";
import { trackerReducer } from "./reducers/timeTracker.ts";

const rootReducer = combineReducers({
    counterReducer,
    postListReducer,
    trackerReducer
})

export default rootReducer