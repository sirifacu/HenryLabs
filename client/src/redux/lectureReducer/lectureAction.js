import axios from 'axios';
import { consoleLog } from '../../services/consoleLog'
import { divideLecturesByModules } from '../../services/divideLecturesByModules'

export const GET_LECTURES = 'GET_LECTURES';
export const GET_ALL_MODULES_FROM_COHORT = 'GET_ALL_MODULES_FROM_COHORT';
export const GET_LECTURES_MODULE = 'GET_LECTURES_MODULE';
export const GET_LECTURE = 'GET_LECTURE';
export const GET_TEACHERS_LECTURES = 'GET_TEACHERS_LECTURES';
export const ADD_LECTURE = 'ADD_LECTURE';
export const UPDATE_LECTURE = 'UPDATE_LECTURE';
export const DELETE_LECTURE = 'DELETE_LECTURE';
export const FILTER_LECTURES = 'FILTER_LECTURES';
export const FILES_BY_LECTURE = 'FILES_BY_LECTURE';
export const REMOVE_FILE_FROM_LECTURE = 'REMOVE_FILE_FROM_LECTURE'



export const getLectures = (cohortId, flag = false, moduleNum) => (dispatch, getState) => {
    if(!flag){
        axios.get(cohortId ? `/lectures/listAll?cohortId=${cohortId}` : `/lectures/listAll` ,
          { headers: {'Authorization': 'Bearer ' + getState().userLoggedIn.token }})
            .then(res => dispatch({type: GET_LECTURES, payload: res.data}))
            .then(res => dispatch({type: GET_ALL_MODULES_FROM_COHORT}))
            .catch(err => consoleLog(err));
    } else {
        axios.get(cohortId ? `/lectures/listAll?cohortId=${cohortId}` : `/lectures/listAll`, 
        { headers: {Authorization: 'Bearer ' + getState().userLoggedIn.token }} )
        .then(res => dispatch({type: GET_LECTURES, payload: divideLecturesByModules(res.data, true)[moduleNum] }))
        .catch(err => consoleLog(err));
    }
};

export const getFilesByLectures = lectureId => (dispatch, getState) => {
    axios.get(`/files/listAll/${lectureId}`,
      { headers: {'Authorization': 'Bearer ' + getState().userLoggedIn.token }})
    .then(res => dispatch({type: FILES_BY_LECTURE, payload: res.data[0].files}))
}

export const filterLectures = search => {
    return {type: FILTER_LECTURES, payload: search}
}

export const removePhotoFromLecture = (lectureId, photoId) => (dispatch, getState) => {
    axios.delete(`/files/remove/${lectureId}/file/${photoId}`,
      { headers: {'Authorization': 'Bearer ' + getState().userLoggedIn.token }})
    .then(()  => dispatch({type: REMOVE_FILE_FROM_LECTURE, payload: photoId}))
}


export const getLecturesModule = (module, userId) => (dispatch, getState) => {
    axios.get(`/lectures/list/${module}/user/${userId}`,
      { headers: {'Authorization': 'Bearer ' + getState().userLoggedIn.token }})
    .then(res => dispatch({type: GET_LECTURES_MODULE, payload: res.data }) )
    .catch(err => consoleLog(err));
};

export const getLecture = lectureId => (dispatch, getState) => {
    axios.get(`/lectures/list/lecture/${lectureId}`,
      { headers: {'Authorization': 'Bearer ' + getState().userLoggedIn.token }})
    .then(res => dispatch({type: GET_LECTURE, payload: res.data }))
    .catch(err => consoleLog(err));
};

export const getTeachersLectures = userId => (dispatch, getState) => {
    axios.get(`/lectures/list//user/${userId}`,
      { headers: {'Authorization': 'Bearer ' + getState().userLoggedIn.token }})
    .then(res => dispatch({type: GET_TEACHERS_LECTURES, payload: res.data }) )
    .catch(err => consoleLog(err));
};

export const addLecture = lecture => (dispatch, getState) => {
    axios.post(`/lectures/add/${lecture.cohort}`, lecture,
      { headers: {'Authorization': 'Bearer ' + getState().userLoggedIn.token }})
    .then(res => dispatch({type: ADD_LECTURE, payload: res.data}))
    .then(() => {
        axios.get(`/cohorts/${lecture.cohort}/user`, 
        { headers: {Authorization: 'Bearer ' + getState().userLoggedIn.token }})
        .then(res => {
            let tokens = res.data.map(item => item.registrationToken)
            axios.post('/notifications/sendToMany', {
                title: "Nueva Clase",
                body: `Se ha agregado la clase ${lecture.title} a tu cohorte.`,
                registrationTokens: tokens.filter(item => !!item)
            },
            { headers: {Authorization: 'Bearer ' + getState().userLoggedIn.token }})
        })
    })
    .catch(err => consoleLog(err));
};

export const updateLecture = (lectureId, updatedLecture) => (dispatch, getState) => {
    axios.put(`/lectures/update/${lectureId}`, updatedLecture,
      { headers: {'Authorization': 'Bearer ' + getState().userLoggedIn.token }})
    .then(res => dispatch({type: ADD_LECTURE, payload: res.data}))
    .catch(err => consoleLog(err));
};

export const deleteLecture = lectureId => (dispatch, getState) => {
    axios.delete(`/lectures/remove/${lectureId}`,
      { headers: {'Authorization': 'Bearer ' + getState().userLoggedIn.token }})
    .then(res => dispatch({type: DELETE_LECTURE, payload: res.data}))
    .catch(err => consoleLog(err));
};
