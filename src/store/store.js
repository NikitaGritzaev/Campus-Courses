import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { accountReducer } from "./reducers/accountReducer";
import { groupsReducer } from "./reducers/groupsReducer";
import { usersReducer } from "./reducers/usersReducer";
import { courseReducer } from "./reducers/courseReducer";
import { coursesListReducer } from "./reducers/coursesListReducer";

const rootReducer = combineReducers({
  account: accountReducer,
  groups: groupsReducer,
  users: usersReducer,
  coursesList: coursesListReducer,
  course: courseReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

window.store = store;
