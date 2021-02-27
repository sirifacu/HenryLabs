import axios from 'axios';
import { consoleLog } from '../../services/consoleLog';

export const GET_USERS = 'GET_USERS';
export const GET_USER = 'GET_USER';
export const GET_STUDENTS = 'GET_STUDENTS';
export const GET_PM = 'GET_PM';
export const GET_INSTRUCTORS = 'GET_INSTRUCTORS';

export const getUsers = () => (dispatch) => {
    return axios.get('/users')
    .then(res => dispatch({type: GET_USERS, payload: res.data}))
    .catch(err => consoleLog(err));
};

export const getUser = () => dispatch => {
    return axios.get('/users/:id')
    .then(response => {
        dispatch({type: GET_USER, payload: response.data})
    })
    .catch(error => {
        console.log(error)
    })
}

export const getStudents = () => (dispatch) => {
    return axios.get('/users/listAll?rol=Student')
    .then(res => {
        dispatch({type: GET_STUDENTS, payload: res.data})

    })
    .catch(e => console.log(e))
}

export const getPm = () => (dispatch) => {
    return axios.get('/users/listAll?rol=Pm')
    .then(res => {
        dispatch({type: GET_PM, payload: res.data})
    })
    .catch(e => console.log(e))
}

export const getInstructors = () => (dispatch) => {
    return axios.get('/users/listAll?rol=Instructor')
    .then(res => {
        const instructors = res.data.slice(0, res.data.length - 1).map(inst => inst.users[0]);
        dispatch({type: GET_INSTRUCTORS, payload: instructors });
    })
    .catch(err => consoleLog(err));
};