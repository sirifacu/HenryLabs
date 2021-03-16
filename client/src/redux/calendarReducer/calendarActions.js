import axios from 'axios'
import Swal from 'sweetalert2';

export const GET_EVENTS = 'GET_EVENTS'
export const CREATE_EVENT = 'CREATE_EVENT' 
export const EDIT_EVENT = 'EDIT_EVENT'
export const DELETE_EVENT = 'DELETE_EVENT'

export const getEvents = () => (dispatch, getState) => {
    return axios.get('/events/listAll', { headers: {'Authorization': 'Bearer ' + getState().userLoggedIn.token }})
    .then( response => {
        const events = []
        response.data.forEach( element => {
            element.start = new Date(element.start)
            element.end = new Date(element.end)
            events.push(element)
        })
        dispatch({
            type: GET_EVENTS,
            payload: events
        })
    })
    .catch(error => {
        console.log(error)
    })
}

export const createNewEvent = event => (dispatch, getState) => {
    return axios.post('/events/post', event, { headers: {'Authorization': 'Bearer ' + getState().userLoggedIn.token }})
    .then(response => {
        const event = response.data
        event.start = new Date(event.start)
        event.end = new Date(event.end)
        dispatch({
            type: CREATE_EVENT,
            payload: event
        })
        Swal.fire({
            title: "Creadisimo",
            icon: 'success'
        })
    })
    .catch(error => {
        Swal.fire({
            title: error,
            icon: "warning"
          })
    })
}

export const editEvent = (event, id) => (dispatch, getState) => {
    return axios.put(`/events/editEvent/${id}`, event, { headers: {'Authorization': 'Bearer ' + getState().userLoggedIn.token }})
    .then(response => {
        const event = response.data
        event.start = new Date(event.start)
        event.end = new Date(event.end)
        dispatch({
            type: EDIT_EVENT,
            payload: event
        })
        Swal.fire({
            title: "Editadisimo",
            icon: "success"
        })
    })
    .catch(error => {
        Swal.fire({
            title: error,
            icon: "warning"
          })
    })
}

export const deleteEvent = eventId => (dispatch, getState) => {
    return axios.delete(`/events/deleteEvent/${eventId}`, { headers: {'Authorization': 'Bearer ' + getState().userLoggedIn.token }})
    .then( response => {
        dispatch({
            type: DELETE_EVENT,
            payload: eventId
        })
        Swal.fire({
          title: "Eliminadisimo",
          icon: "success"
        })
    })
    .catch( error => {
      Swal.fire({
        title: "algo salio mal",
        icon: "warning"
      })
    })
}
