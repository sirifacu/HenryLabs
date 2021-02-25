import { combineReducers } from 'redux';
import loginReducer from "./loginReducer/loginReducer";

const rootReducer = combineReducers({
  userLoggedIn: loginReducer,

});

export default rootReducer;
