import { GET_EVENTS, CREATE_EVENT, EDIT_EVENT, DELETE_EVENT } from './calendarActions'

const initialState = {
    events: []
}

 function calendarReducer (state = initialState, action) {
    switch(action.type){
        case GET_EVENTS:{
            return {
                events: action.payload
            }
        }
        case CREATE_EVENT:{
            return {
                events: [...state.events, action.payload]
            }
        }
        case DELETE_EVENT:{
            return {
                events: state.events.filter(event => event._id !== action.payload)
            }
        }
        case EDIT_EVENT:{
            const newEvents = state.events.filter(event => event._id !== action.payload._id)
            return {
                events: [...newEvents, action.payload]
            }
        }
        default:{
            return state
        }
    }
}

export default calendarReducer
