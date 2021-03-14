import { GET_ALL_COHORTS, CREATE_COHORT, GET_COHORT, GET_ONE_COHORT_DETAIL, REMOVE_EDITING_COHORT, SET_EDITING_COHORT } from './cohortAction';

const initialState = {
    cohorts: [],
    cohort: [],
    cohortDeatil: {},
    editingCohort: []
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
        case SET_EDITING_COHORT: {
            return {
                ...state,
                editingCohort: action.payload
            }
        }
        case REMOVE_EDITING_COHORT: {
            return {
                ...state,
                editingCohort: []
            }
        }
        default:
            return state
    }
}

export default cohortReducer