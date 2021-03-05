import axios from 'axios';
import { consoleLog } from '../../services/consoleLog'

export const GET_ALL_GROUPS = 'GET_ALL_GROUPS';
export const CREATE_GROUP = 'CREATE_GROUP';
export const GET_GROUP = 'GET_GROUP';

const token = localStorage.getItem('data');

export const getGroups = () => (dispatch) => {
    return axios.get('/groups/getAll', { headers: {'Authorization': 'Bearer ' + token }})
    .then(res => dispatch({type: GET_ALL_GROUPS, payload: res.data}))
    .catch(e => consoleLog(e));
};

export const createGroup = (data) => (dispatch) => {
    return axios.post('/groups/create ', {
        title: data.title,
        number: data.number,
     }, { headers: {'Authorization': 'Bearer ' + token }
    }).then(res => dispatch({type: CREATE_GROUP, payload: res.data}))
      .catch(e => consoleLog(e));
 };

 export const getGroup =  (id) => (dispatch) => {
    return axios.get(`/groups/${id}/user`, { headers: {'Authorization': 'Bearer ' + token }})
    .then(res => {
        consoleLog("res", res.data)
        dispatch({type: GET_GROUP, payload: res.data})})
    .catch(e => consoleLog(e));
};
