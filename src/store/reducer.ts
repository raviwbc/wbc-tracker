import { combineReducers } from "redux";
import { counterReducer } from "./reducers/counter.ts";
import { postListReducer } from "./reducers/titleList.ts";
import { trackerReducer } from "./reducers/timeTracker.ts";
import { loginValidation } from "./reducers/auth.ts";

import { manualEntryReducer } from "./reducers/manualEntry.ts";

const rootReducer = combineReducers({
    counterReducer,
    postListReducer,
    trackerReducer,
    manualEntryReducer,
})

export default rootReducer