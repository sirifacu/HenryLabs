import {    GET_LECTURES, 
            GET_LECTURES_MODULE,
            GET_LECTURE, 
            GET_TEACHERS_LECTURES, 
            ADD_LECTURE,
            UPDATE_LECTURE, 
            DELETE_LECTURE } from './lectureAction'


const initialState = {
    lectures: [],
    lecture: {},
    temporalId: ''
  } 

export default (state = initialState, action) => {
    switch(action.type){
        case GET_LECTURES: {
            return {
                ...state,
                lectures: action.payload
            };
        };
        case GET_LECTURES_MODULE: {
            return {
                ...state,
                lectures: action.payload
            };
        };
        case GET_LECTURE:
            return {
                ...state,
                lecture: action.payload
            };
        case GET_TEACHERS_LECTURES: {
            return {
                ...state,
                lectures: action.payload
            };
        };
        case ADD_LECTURE: {
            return {
                ...state,
                lectures: state.lectures.concat(action.payload),
                temporalId: action.payload.id
            };
        };
        case UPDATE_LECTURE: {
            for (let item of state.lectures){
                if (item.id === action.payload.id){
                    item = action.payload;
                };
            };
            return {
            ...state,
            lectures: state.lectures
            };
        };
        case DELETE_LECTURE: {
            return {
                ...state,
                lectures: state.lectures.filter(item => item.id !== action.payload.id)
            };
        };
        default: return state;
    };
};