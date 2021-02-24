import { GET_COHORTS, CREATE_COHORT } from './cohortAction';

const initialState = {
    cohorts: [],
    newCohort: {}
}

export default (state = initialState, action) => {
    switch(action.type){
        case GET_COHORTS: {
            return {
                ...state,
                cohorts: action.payload
            }
        }
        case CREATE_COHORT: {
            return {
                ...state,
                newCohort: action.payload,
            }
        }
        default:
            return state
    }
}