import { combineReducers } from 'redux';
import cohortReducer from './cohortReducer/cohortReducer';
import userReducer from './userReducer/userReducer'

const rootReducer = combineReducers({
    cohortReducer,
    userReducer
});

export default rootReducer;
