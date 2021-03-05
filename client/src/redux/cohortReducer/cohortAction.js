import axios from 'axios';
import { consoleLog } from '../../services/consoleLog';
import Swal from 'sweetalert2';

export const GET_ALL_COHORTS = 'GET_ALL_COHORTS';
export const CREATE_COHORT = 'CREATE_COHORT';
export const GET_COHORT = 'GET_COHORT';

const token = localStorage.getItem('data');

export const getCohorts = () => (dispatch) => {
    return axios.get('/cohorts/getAll', { headers: {'Authorization': 'Bearer ' + token }})
    .then(res => dispatch({type: GET_ALL_COHORTS, payload: res.data}))
    .catch(e => consoleLog(e));
};

export const createCohort = (data) => (dispatch) => {
   return axios.post('/cohorts/create ', {
       title: data.title,
       number: data.number,
       initialDate: data.initialDate,
       instructor_id: data.instructor_id,
       instructor_name: data.instructor_name
    }, { headers: {'Authorization': 'Bearer ' + token }}).then(res => {
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

export const getCohort =  (id) => (dispatch) => {
    return axios.get(`/cohorts/${id}/user`, { headers: {'Authorization': 'Bearer ' + token }})
    .then(res => dispatch({type: GET_COHORT, payload: res.data[0].users}))
    .catch(e =>  consoleLog(e));
};
