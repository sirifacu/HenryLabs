import { GET_ALL_COHORTS, CREATE_COHORT, GET_COHORT, GET_ONE_COHORT_DETAIL } from './cohortAction';

const initialState = {
    cohorts: [],
    cohort: [],
    cohortDeatil: {}
}

const cohortReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_ALL_COHORTS: {
            return {
                ...state,
                cohorts: action.payload
            }
        }
        case CREATE_COHORT: {
            return {
                ...state,
                cohorts: [...state.cohorts, action.payload],
            }
        }
        case GET_COHORT: {
            return {
                ...state,
                cohort: action.payload,
            }
        }
        case GET_ONE_COHORT_DETAIL: {
            return {
                ...state,
                cohortDeatil: action.payload,
            }
        }
        default:
            return state
    }
}

export default cohortReducer