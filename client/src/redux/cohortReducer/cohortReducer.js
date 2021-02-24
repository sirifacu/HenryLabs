import { GET_ALL_COHORTS } from './cohortAction.js'


const initialState = {
    allCohorts: []
};


const cohortReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_COHORTS: {
            return {
                ...state,
                allCohorts: action.payload
            }
        }
        default: return state;
    }
}

export default cohortReducer;