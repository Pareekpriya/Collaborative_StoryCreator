import { applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux";
import { authReducer } from "./reducers/authReducer";
import { thunk } from "redux-thunk";
import { storyReducer } from "./reducers/storyReducer";

const rootReducer = combineReducers({
    auth:authReducer,
    story:storyReducer
})

export const store = createStore(rootReducer,applyMiddleware(thunk))