import axios from 'axios';
import { consoleLog } from '../../services/consoleLog';

export const GET_USERS = 'GET_USERS';
export const GET_INSTRUCTORS = 'GET_INSTRUCTORS';

export const getUsers = () => (dispatch) => {
    return axios.get('/users')
    .then(res => dispatch({type: GET_USERS, payload: res.data}))
    .catch(err => consoleLog(err));
};

export const getInstructors = () => (dispatch) => {
    return axios.get('/users/listAll?role=Instructor')
    .then(res => dispatch({type: GET_INSTRUCTORS, payload: res.data }) )
    .catch(err => consoleLog(err));
};