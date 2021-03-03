import axios from 'axios';
import { consoleLog } from '../../services/consoleLog'

export const GET_ALL_GROUPS = 'GET_ALL_GROUPS';
export const CREATE_GROUP = 'CREATE_GROUP';
export const GET_GROUP = 'GET_GROUP';

export const getGroups = () => (dispatch) => {
    return axios.get('/groups/getAll')
    .then(res => dispatch({type: GET_ALL_GROUPS, payload: res.data}))
    .catch(e => consoleLog(e));
};

export const createGroup = (data) => (dispatch) => {
    return axios.post('/groups/create ', {
        number: data.number,
        pm1: data.pm1,
        pm2: data.pm2
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