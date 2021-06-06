import axios from "axios";
import {consoleLog} from '../../services/consoleLog'
import Swal from 'sweetalert2';

export const POST_NEWS = 'POST_NEWS';
export const GET_NEWS = 'GET_NEWS';
export const DELETE_NOTICE = 'DELETE_NOTICE';
export const GET_NOTICE = 'GET_NOTICE'
export const GET_NEWS_AND_BOOMS = 'GET_NEWS_AND_BOOMS'


export const postNews = (values) => (dispatch, getState) => {
  return axios
  .post(`/news/post`, values, 
  { headers: {Authorization: 'Bearer ' + getState().userLoggedIn.token }})
  .then((data) =>{
    dispatch({
      type: POST_NEWS,
      payload: data
    })
      Swal.fire({
        icon: 'success',
        title: 'Noticia publicada',
    });
  }).catch(err => consoleLog(err));
}

export const getNews = () => (dispatch, getState) => {
  return axios
  .get(`/news/list`, { headers: {Authorization: 'Bearer ' + getState().userLoggedIn.token }})
  .then((data) => {
    dispatch({
      type: GET_NEWS,
      payload: data
    })
  }).catch(err => consoleLog(err))
}

export const getNotice = () => (dispatch, getState) => {
  return axios
  .get(`/news/list/:id`, { headers: {Authorization: 'Bearer ' + getState().userLoggedIn.token }})
  .ther((data) => {
    dispatch({
      type: GET_NOTICE,
      payload:data
    })
  }).catch(err => consoleLog(err))
}


export const deleteNews = (id) => (dispatch, getState) => {
  return axios
  .delete(`/news/list/${id}`, { headers: {Authorization: 'Bearer ' + getState().userLoggedIn.token }})
  .then((data) => {
    dispatch({
      type: DELETE_NOTICE,
      payload:data
    })
  }).catch((err)=> consoleLog(err))
}

export const getNewsAndBooms = () => (dispatch, getState) => {
  return axios
  .get('/news/allNewsAndBooms', { headers: {Authorization: 'Bearer ' + getState().userLoggedIn.token }})
  .then((response) => {
    let news = response.data.news
    news.forEach(element => {
      element.createdAt = new Date(element.createdAt)
    })
    dispatch({
      type: GET_NEWS_AND_BOOMS,
      payload: response.data.news.sort((a, b) => b.createdAt - a.createdAt)
    })
  })
}