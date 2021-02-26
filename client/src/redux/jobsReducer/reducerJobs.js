import {POST_JOB} from "./actionsJobs"

const initialState = []

export default (state = initialState, action) => {
    switch(action.type){
        case POST_JOB: {
            console.log('action data en reducer', action.payload)
            return{
                ...state
            }
        }
        default: return state
    }
}