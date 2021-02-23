import axios from 'axios';
import { consoleLog } from '../../services/consoleLog'

export const GET_ALL_LECTURES = 'GET_ALL';
export const GET_LECTURES_MODULE = 'GET_LECTURES_MODULE';
export const GET_TEACHERS_LECTURES = 'GET_TEACHERS_LECTURES';
export const ADD_LECTURE = 'ADD_LECTURE';
export const UPDATE_LECTURE = 'UPDATE_LECTURE';
export const DELETE_LECTURE = 'DELETE_LECTURE';

export const getAllLectures = () => dispatch => {
    axios.get('/lectures/listAll')
    .then(res => dispatch({type: GET_ALL_LECTURES, payload: res.data}))
    .catch(err => consoleLog(err));
};

export const getLecturesModule = (module, userId) => dispatch => {
    axios.get(`/lectures/list/${module}/user/${userId}`)
    .then(res => dispatch({type: GET_LECTURES_MODULE, payload: res.data }) )
    .catch(err => consoleLog(err));
};

export const getTeachersLectures = userId => dispatch => {
    axios.get(`/lectures/list//user/${userId}`)
    .then(res => dispatch({type: GET_TEACHERS_LECTURES, payload: res.data }) )
    .catch(err => consoleLog(err));
};

export const addLecture = (lecture, userId) => dispatch => {
    if(typeof parseInt(userId) === 'number'){
        axios.post(`/lectures/add/${userId}`, lecture)
        .then(res => dispatch({type: ADD_LECTURE, payload: res.data}))
        .catch(err => consoleLog(err));
    };
};

export const updateLecture = (updatedLecture, userId) => dispatch => {
    if(typeof parseInt(userId) === 'number'){
        axios.put(`/lectures/update/${userId}`, updatedLecture)
        .then(res => dispatch({type: ADD_LECTURE, payload: res.data}))
        .catch(err => consoleLog(err));
    };
};

export const deleteLecture = lecture => dispatch => {
    axios.delete(`/lectures/remove/${lecture.id}`)
    .then(() => dispatch({type: DELETE_LECTURE, type: lecture}))
    .catch(err => consoleLog(err));
}