import { combineReducers } from 'redux';
import userListReducer from './user/reducerUser'

const rootReducer = combineReducers({
    userListReducer,
    
});

export default rootReducer;
