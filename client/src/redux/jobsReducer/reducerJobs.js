import {POST_JOB} from "./actionsJobs"

const initialState = []

export default (state = initialState, action) => {
    switch(action.type){
        case POST_JOB: {
            return{
                ...state
            }
        }
        default: return state
    }
}