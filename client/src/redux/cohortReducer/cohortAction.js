import axios from 'axios';

export const GET_COHORTS = 'GET_COHORTS';
export const CREATE_COHORT = 'CREATE_COHORT';
export const GET_COHORT = 'GET_COHORT';

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
            dispatch({type: GET_COHORTS, payload: result.slice(0, result.length - 1)})
        })
    })
    .catch(e => console.log(e))
};

export const createCohort = (data) => (dispatch) => {
   return axios.post('http://localhost:3005/api/cohorts ', {
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

export const getCohort =  (id) => (dispatch) => {
    return axios.get(`http://localhost:3005/api/cohorts/${id}/user`)
    .then(res => {
        dispatch({type: GET_COHORT, payload: res.data})
    })
    .catch(e =>  console.log(e))
}
