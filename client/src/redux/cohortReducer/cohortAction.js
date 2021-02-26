import axios from 'axios';

export const GET_ALL_COHORTS = 'GET_ALL_COHORTS';
export const CREATE_COHORT = 'CREATE_COHORT';
export const GET_COHORT = 'GET_COHORT';

// Dejo este codigo aca para que entiendan como crear un promises all y conectar una tabla con una id de un usuario
// Para este caso, al final, la solucion mas sencilla era agregar el instructor name y id al cohorte

/* 
export const getCohorts = () => (dispatch) => {
    return axios.get('/cohorts')
    .then(res => {
        let result = []
        let cohorts = res.data.slice(0, res.data.length -1)
        const promises = cohorts.map((item) => {
            new Promise((resolve, reject) => {
                resolve(axios.get(`/cohorts/${item.id}/instructor`).then((res) => {
                    result.push({...item, instructor: res.data.users[0]})
                }))
            }) 
        })
        Promise.all(promises).then((res) => {
            dispatch({type: GET_ALL_COHORTS, payload: result.slice(0, result.length - 1)})
        })
    })
    .catch(e => console.log(e))
}; */

export const getCohorts = () => (dispatch) => {
    return axios.get('/cohorts/getAll')
    .then(res => {
        dispatch({type: GET_ALL_COHORTS, payload: res.data});
    })
    .catch(e => console.log(e))
};

export const createCohort = (data) => (dispatch) => {
    console.log(data)
   return axios.post('/cohorts/create ', {
       title: data.title,
       number: data.number,
       initialDate: data.initialDate,
       instructor_id: data.instructor_id,
       instructor_name: data.instructor_name
    }).then(res => {dispatch({type: CREATE_COHORT, payload: res.data})})
    .catch(e => console.log(e))
} 

export const getCohort =  (id) => (dispatch) => {
    return axios.get(`/cohorts/${id}/user`)
    .then(res => {
        dispatch({type: GET_COHORT, payload: res.data})
    })
    .catch(e =>  console.log(e))
}
