import { combineReducers } from "redux";
import { counterReducer } from "./reducers/counter.ts";
import { postListReducer } from "./reducers/titleList.ts";
import { trackerReducer } from "./reducers/timeTracker.ts";
import { loginValidationReducer } from "./reducers/auth.ts";
import { logoutReducer } from "./reducers/logout.ts";

import { manualEntryReducer } from "./reducers/manualEntry.ts";

import { loaderStatus } from "./reducers/loader.ts";
import { deleteTaskReducer, entryListReducer } from "./reducers/todayCompletedList.ts";

const rootReducer = combineReducers({
    manualEntryReducer,
    counterReducer,
    postListReducer,
    trackerReducer,
    loginValidationReducer,
    entryListReducer,
    logoutReducer,
    loaderStatus,    
    deleteTaskReducer
})

export default rootReducer