import {POST_JOB, GET_JOBS} from "./actionsJobs"

const initialState = []

export default (state = initialState, action) => {
    switch(action.type){
        case POST_JOB: {
            return{
                ...state
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