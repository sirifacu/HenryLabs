import { combineReducers } from 'redux';
import darkModeReducer from "./darkModeReducer/reducerDarkMode"

const rootReducer = combineReducers({
  darkModeReducer,

});

export default rootReducer;
