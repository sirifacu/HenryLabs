import {POST_JOB, GET_JOBS, DELETE_JOBS, APPLY_JOB} from "./actionsJobs"

const initialState = {
    jobs: []
}

const jobsReducer = (state = initialState, action) => {
    switch(action.type){
        case POST_JOB: {
            return{
                ...state,
                jobs: state.jobs.concat(action.payload.data)
            }
        }
        case GET_JOBS: {
            return{
                ...state,
                jobs: action.payload.data
            }
        }
        case DELETE_JOBS: {
            return{
                ...state
            }
        }
        case APPLY_JOB:{
            return{
                ...state
            }
        }
        default: return state
    }
};

export default jobsReducer;
