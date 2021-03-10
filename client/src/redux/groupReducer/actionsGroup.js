import axios from 'axios';
import { consoleLog } from '../../services/consoleLog'

export const GET_ALL_GROUPS = 'GET_ALL_GROUPS';
export const CREATE_GROUP = 'CREATE_GROUP';
export const GET_GROUP = 'GET_GROUP';
export const GET_FILTERED_PMS = 'GET_FILTERED_PMS';

export const getGroups = () => (dispatch) => {
    return axios.get('/groups/getAll')
    .then(res => dispatch({type: GET_ALL_GROUPS, payload: res.data}))
    .catch(e => consoleLog(e));
};

export const createGroup = (data) => (dispatch) => {
    return axios.post('/groups/create ', {
        title: data.title,
        number: data.number,
     }).then(res => dispatch({type: CREATE_GROUP, payload: res.data}))
     .catch(e => consoleLog(e));
 };

 export const getGroup =  (id) => (dispatch) => {
    return axios.get(`/groups/${id}/user`)
    .then(res => {
        consoleLog("res", res.data)
        dispatch({type: GET_GROUP, payload: res.data})})
    .catch(e => consoleLog(e));
};

export const getFilteredPms = (firstName, lastName, cohortNumber, roles) => dispatch => {   
    let url = `/users/listUsersBy?firstName=${firstName ? firstName : ""}&lastName=${lastName ? lastName : ""}&cohortNumber=${cohortNumber ? cohortNumber-2 : ""}&roles=${roles ? roles : ""} `
     return axios.get(url)
    .then(res => {
        console.log('DATA', res.data)
        dispatch({ type: GET_FILTERED_PMS, payload: res.data })})
    .catch(err => consoleLog(err));
};