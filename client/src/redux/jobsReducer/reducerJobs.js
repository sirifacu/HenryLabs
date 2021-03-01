import {POST_JOB, GET_JOBS} from "./actionsJobs"

const initialState = {
    jobs: []
}

export default (state = initialState, action) => {
    switch(action.type){
        case POST_JOB: {
            return{
                ...state,
                jobs: state.jobs.concat(action.payload.data)
            }
        }
        case GET_JOBS: {
            return{
                ...state
            }
        }
        default: return state
    }
}