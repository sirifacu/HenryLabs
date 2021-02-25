import { bindActionCreators } from "redux"
import {INVITE_STUDENT} from "./actionsInvite"

const initialState = []

export default (state = initialState, action) => {
    switch(action.type){
        case INVITE_STUDENT: {
            return{
                ...state
            }
        }
    default: return state
    }
}