import axios from 'axios';
import { consoleLog } from '../../services/consoleLog'
import Swal from 'sweetalert2';

export const GET_ALL_GROUPS = 'GET_ALL_GROUPS';
export const CREATE_GROUP = 'CREATE_GROUP';
export const GET_GROUP = 'GET_GROUP';
export const GET_FILTERED_PMS = 'GET_FILTERED_PMS';


export const getGroups = () => (dispatch, getState) => {
    return axios.get('/groups/getAll',
      { headers: {'Authorization': 'Bearer ' + getState().userLoggedIn.token }})
    .then(res => dispatch({type: GET_ALL_GROUPS, payload: res.data}))
    .catch(e => consoleLog(e));
};


export const createGroup = (data) => (dispatch, getState) => {
    const { number, pm1, pm2, cohortId } = data
    console.log("Esto me llega como data xd: ", data)
    return axios.post(`/groups/create/cohorts/${cohortId}` , {
        number: data.number,
        pm1: data.pm1,
        pm2: data.pm,
        cohortId: data.cohortId
     }, { headers: {'Authorization': 'Bearer ' + getState().userLoggedIn.token }
    }).then(res => {
        if(res.data.message){
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: "Parece que hubo un error!",
                confirmButtonColor: 'green',
                text: `${res.data.message}`,
                showConfirmButton: true,
            });
        } else { 
            dispatch({type: CREATE_GROUP, payload: res.data})}
        })
     .catch(e => consoleLog(e));


 export const getGroup =  (id) => (dispatch, getState) => {
    return axios.get(`/groups/${id}/user`,
      { headers: {'Authorization': 'Bearer ' + getState().userLoggedIn.token }})
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

