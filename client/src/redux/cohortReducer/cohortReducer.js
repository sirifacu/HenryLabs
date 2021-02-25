import { GET_COHORTS, CREATE_COHORT, GET_COHORT } from './cohortAction';

const initialState = {
    cohorts: [],
    newCohort: {},
    cohort: [],
    createNewRow: false,
    bringCohort: false
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
                cohorts: state.cohorts.concat(action.payload),
            }
        }
        case GET_COHORT: {
            return {
                ...state,
                cohort: action.payload,
                bringCohort: true
            }
        }
        default:
            return state
    }
}
