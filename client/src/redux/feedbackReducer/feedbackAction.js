import axios from 'axios';
import { consoleLog } from '../../services/consoleLog';

export const LIST_ALL_FEEDBACKS_FROM_LECTURE = 'LIST_ALL_FEEDBACKS_FROM_LECTURE';
export const GET_FEEDBACK_FROM_USER = 'GET_FEEDBACK_FROM_USER';
export const LIST_ALL_FEEDBACKS_FROM_USER = 'LIST_ALL_FEEDBACKS_FROM_USER';
export const GET_FEEDBACK = 'GET_FEEDBACK';
export const GET_AVERAGE_FEEDBACKS_FROM_USER = 'GET_AVERAGE_FEEDBACKS_FROM_USER';
export const GET_AVERAGE_FEEDBACKS_FROM_LECTURE = 'GET_AVERAGE_FEEDBACKS_FROM_LECTURE';
export const POST_FEEDBACK = 'POST_FEEDBACK';
export const CHANGE_FEEDBACK = 'CHANGE_FEEDBACK';
export const DELETE_FEEDBACK = 'DELETE_FEEDBACK';
export const CHANGE_DONE = 'CHANGE_DONE'


export const getAllFeedbacksFromLecture = lectureId => (dispatch, getState) => {
    return axios.get(`/feedbacks/listAll/${lectureId}`,
      { headers: {'Authorization': 'Bearer ' + getState().userLoggedIn.token }})
    .then(res => dispatch({ type: LIST_ALL_FEEDBACKS_FROM_LECTURE, payload: res.data }))
    .catch(err => consoleLog(err));
};

export const getFeedbackFromUser = (lectureId, userId) => (dispatch, getState) => {
    return axios.get(`feedbacks/list/user/${userId}/lecture/${lectureId}`,
      { headers: {'Authorization': 'Bearer ' + getState().userLoggedIn.token }})
    .then(res => dispatch({ type: GET_FEEDBACK_FROM_USER, payload: res.data }))
    .catch(err => consoleLog(err));
};

export const getAllFeedbacksFromUser = userId => (dispatch, getState) => {
    return axios.get(`feedbacks/list/user/${userId}`,
      { headers: {'Authorization': 'Bearer ' + getState().userLoggedIn.token }})
    .then(res => dispatch({ type: LIST_ALL_FEEDBACKS_FROM_USER, payload: res.data }))
    .catch(err => consoleLog(err));
};

export const getFeedback = feedbackId => (dispatch, getState) => {
    return axios.get(`feedbacks/feedback/${feedbackId}`,
      { headers: {'Authorization': 'Bearer ' + getState().userLoggedIn.token }})
    .then(res => dispatch({ type: GET_FEEDBACK, payload: res.data }))
    .catch(err => consoleLog(err));
};

export const getAverageFeedbacksFromUser = userId => (dispatch, getState) => {
    return axios.get(`feedbacks/average/user/${userId}`,
      { headers: {'Authorization': 'Bearer ' + getState().userLoggedIn.token }})
    .then(res => dispatch({ type: GET_AVERAGE_FEEDBACKS_FROM_USER, payload: res.data }))
    .catch(err => consoleLog(err));
};

export const getAverageFeedbacksFromLecture = lectureId => (dispatch, getState) => {
    return axios.get(`feedbacks/average/lecture/${lectureId}`,
      { headers: {'Authorization': 'Bearer ' + getState().userLoggedIn.token }})
    .then(res => dispatch({ type: GET_AVERAGE_FEEDBACKS_FROM_LECTURE, payload: res.data}))
    .catch(err => consoleLog(err));
};

export const postFeedback = (userId, rating, comment, lectureId) => (dispatch, getState) => {
    return axios.post('feedbacks/feedback', { userId, rating, comment, lectureId },
      { headers: {'Authorization': 'Bearer ' + getState().userLoggedIn.token }})
    .then(res => dispatch({ type: POST_FEEDBACK, payload: res.data }))
    .catch(err => consoleLog(err));
};

export const changeFeedback = (feedbackId, rating, comment) => (dispatch, getState) => {
    return axios.put(`feedbacks/feedback/${feedbackId}`, { rating, comment },
      { headers: {'Authorization': 'Bearer ' + getState().userLoggedIn.token }})
    .then(res => dispatch({ type: CHANGE_FEEDBACK, payload: res.data }))
    .catch(err => consoleLog(err));
};

export const deleteFeedback = feedbackId => (dispatch, getState) => {
    return axios.delete(`/feedbacks/feedback/${feedbackId}`,
      { headers: {'Authorization': 'Bearer ' + getState().userLoggedIn.token }})
    .then(res => dispatch({ type: DELETE_FEEDBACK, payload: true }))
    .catch(err => consoleLog(err));
};
