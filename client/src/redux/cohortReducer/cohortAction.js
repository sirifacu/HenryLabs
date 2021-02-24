import axios from 'axios';

export const  GET_COHORTS = 'GET_COHORTS';
export const CREATE_COHORT = 'CREATE_COHORT';
export const GET_COHORT = 'GET_COHORT';

export const getCohorts = () => (dispatch) => {
    return axios.get('http://localhost:3005/api/cohort')
    .then(res => {
        dispatch({type: GET_COHORTS, payload: res.data})
    })
    .catch(e => console.log(e))
};

export const createCohort = (data) => (dispatch) => {
   return axios.post('http://localhost:3005/api/cohort ', {
       title: data.title,
       instructor: data.instructor,
       number: data.number,
       initialDate: data.initialDate
   })
        .then(res => {
            dispatch({type: CREATE_COHORT, payload: res.data})
        })
        .catch(e => console.log(e))
} 

export const getCohort = (id) => (dispatch) => {
    return axios.get(`http://localhost:3005/api/cohort/${id}`)
    .then(res => {
        dispatch({type: GET_COHORT, payload: res.data})
    })
    .catch(e =>  console.log(e))
}