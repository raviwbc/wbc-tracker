import { combineReducers } from "redux";
import { counterReducer } from "./reducers/counter.ts";
import { postListReducer } from "./reducers/titleList.ts";

const rootReducer = combineReducers({
    counterReducer,
    postListReducer
})

export default rootReducer