import axios from 'axios';
import { consoleLog } from '../../services/consoleLog';
import Swal from 'sweetalert2';

export const GET_ALL_COHORTS = 'GET_ALL_COHORTS';
export const CREATE_COHORT = 'CREATE_COHORT';
export const GET_COHORT = 'GET_COHORT';
export const GET_ONE_COHORT_DETAIL = 'GET_ONE_COHORT_DETAIL'
export const SET_EDITING_COHORT = 'SET_EDITING_COHORT'
export const REMOVE_EDITING_COHORT = 'REMOVE_EDITING_COHORT'



export const getCohorts = () => (dispatch, getState) => {
    return axios.get('/cohorts/getAll', { headers: {'Authorization': 'Bearer ' + getState().userLoggedIn.token }})
    .then(res => dispatch({type: GET_ALL_COHORTS, payload: res.data}))
    .catch(e => consoleLog(e));
};

export const getCohortDetails = (id) => (dispatch, getState) => {
    return axios.get(`cohorts/get/cohort/${id}`,
      { headers: {'Authorization': 'Bearer ' + getState().userLoggedIn.token }})
    .then(res => dispatch({type: GET_ONE_COHORT_DETAIL, payload: res.data}))
    .catch(e => consoleLog(e))
}

export const setEditingCohort = (cohort) => (dispatch) => {
    return dispatch({type: SET_EDITING_COHORT, payload: cohort})
}

export const removeEditingCohort = () => (dispatch) => {
    return dispatch({type: REMOVE_EDITING_COHORT})
}

export const editCohort = (data) => (dispatch, getState) => {
    return axios.post(`/cohorts/one/edit/${data.id}`,{
        title: data.title,
        number: data.number,
        initialDate: data.initialDate,
        instructor_id: data.instructor_id,
        instructor_name: data.instructor_name
    }, { headers: {'Authorization': 'Bearer ' + getState().userLoggedIn.token }}).then(res => {
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
            dispatch(getCohorts())}
        })
    .catch(e => consoleLog(e));
};

export const createCohort = (data) => (dispatch, getState) => {
   return axios.post('/cohorts/create ', {
       title: data.title,
       number: data.number,
       initialDate: data.initialDate,
       instructor_id: data.instructor_id,
       instructor_name: data.instructor_name
    }, { headers: {'Authorization': 'Bearer ' + getState().userLoggedIn.token }}).then(res => {
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
            dispatch({type: CREATE_COHORT, payload: res.data})}
        })
    .catch(e => consoleLog(e));
};

export const getCohort =  (id) => (dispatch, getState) => {
    return axios.get(`/cohorts/${id}/user`, { headers: {'Authorization': 'Bearer ' + getState().userLoggedIn.token }})
    .then(res => dispatch({type: GET_COHORT, payload: res.data[0].users}))
    .catch(e =>  consoleLog(e));
};
