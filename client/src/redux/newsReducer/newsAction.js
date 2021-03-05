import axios from "axios";
import {consoleLog} from '../../services/consoleLog'
import Swal from 'sweetalert2';

export const POST_NEWS = 'POST_NEWS';
export const GET_NEWS = 'GET_NEWS';
export const DELETE_JOBS = 'DELETE_JOBS';
export const GET_NOTICE = 'GET_NOTICE'

export const postNews = (values) => (dispatch) => {
  return axios
  .post(`/news/post`, {
    title: values.title,
    type: values.type,
    link: values.link,
    description: values.description,
  }).then((data) =>{
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

export const getNews = () => (dispatch) => {
  return axios
  .get(`/news/list`)
  .then((data) => {
    dispatch({
      type: GET_NEWS,
      payload: data
    })
  }).catch(err => consoleLog(err))
}

export const getNotice = () => (dispatch) => {
  return axios
  .get(`/news/list/:id`)
  .ther((data) => {
    dispatch({
      type: GET_NOTICE,
      payload:data
    })
  }).catch(err => consoleLog(err))
}


export const deleteNews = () => (dispatch) => {
  // return axios
  // .delete(``)
  // .then((data) => {

  // }).catch((err)=> consoleLog(err))
}
