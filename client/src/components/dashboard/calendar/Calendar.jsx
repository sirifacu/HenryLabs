import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar' 
import { Button, Dialog, Grid, TextField , DialogContent } from "@material-ui/core";
import { useStylesDark, useStylesLigth, validationSchema } from './styles'
import { getEvents, createNewEvent, deleteEvent, editEvent } from "../../../redux/calendarReducer/calendarActions";
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import './react-big-calendar.css'
import moment from 'moment';
import Swal from 'sweetalert2';


const NewCalendar = () => {
  const type = useSelector(store => store.darkModeReducer.palette.type);
  const dark = useStylesDark()
  const ligth = useStylesLigth()
  const dispatch = useDispatch()
  const localizer = momentLocalizer(moment)
  const events = useSelector( store => store.calendarReducer.events)
  const userLoggedIn = useSelector(store => store.userLoggedIn.userInfo)
  const [eventId, setEventId] = useState()
  const [status, setStatus] = useState()
  const [open, setOpen] = useState(false)
  const isStudent = userLoggedIn.roles.find(element => element.name === 'student')

  useEffect(()=> {
    dispatch(getEvents())
  },[dispatch])

  const formik = useFormik({
    initialValues:{
      title: "",
      description: "",
      start: "",
      end: ""
    },
    validationSchema: validationSchema,
    onSubmit:(values) => {
      switch (status) {
        case 'scroll':{
          dispatch(createNewEvent(values))
          setOpen(false)
        }
        break
        case 'create':{
          dispatch(createNewEvent(values))
          setOpen(false)
        }
        break
        case 'edit':{
          dispatch(editEvent(values, eventId))
          setOpen(false)
        }
        break  
      }
    }
  })
  const handleEdit = (id) => {
    setStatus('edit')
    setEventId(id)
    setOpen(true)
  }
  
      const eventDescription = ( event ) => {
        const start = event.start.toString('').slice(4,24)
        const end = event.end.toString('').slice(4,24)
        if(isStudent){
          Swal.fire({
            html: `<h1>${event.title}</h1>
                   <p>${event.description}</p>
                   <h5>inicio: ${start}</h5>
                   <h5>fin: ${end}</h5>`,
            showConfirmButton: false       
          })
        }else{
        Swal.fire({
          html: `<h1>${event.title}</h1>
                 <p>${event.description}</p>
                 <h5>inicio: ${start}</h5>
                 <h5>fin: ${end}</h5>`,
          confirmButtonText: "Editar",
          showDenyButton: true,
          denyButtonText: "Eliminar",
          confirmButtonColor: "#ffea00",
          denyButtonColor: "#303030",
        })
        .then(result => {
            if(result.isConfirmed){
              formik.values.title = "" 
              formik.values.description = ""
              formik.values.start = ""
              formik.values.end = ""
              handleEdit(event._id)
            }
            if(result.isDenied){
             dispatch(deleteEvent(event._id))
            }
        })}
      }
      const handleSelect = ( { start, end } ) => {
        formik.values.start = start
        formik.values.end = new Date(end).setSeconds(end.getSeconds() + 1)
        formik.values.title = "" 
        formik.values.description = ""
        setStatus('scroll')
        setOpen(true)
      }
      
 if(!isStudent){
      return ( 
        <Grid container spacing={2} direction="column">
          <Dialog
              keepMounted
              open={open}
              onClose={()=> setOpen(false)}
          >
          <DialogContent>
            <Grid container spacing={2} direction='row' justify='center' alignItems='center'>
              {status !== 'scroll'&&<Grid item lg={6} sm={6} sx={12}> 
                <TextField
                fullWidth
                id="start"
                name="start"
                label="inicio*"
                type='datetime-local'
                InputLabelProps={{
                  shrink: true,
                }}
                value={formik.values.start}
                onChange={formik.handleChange}
                error={formik.touched.start && Boolean(formik.errors.start)}
                helperText={formik.touched.start && formik.errors.start}
                />
              </Grid>}
              {status !== 'scroll'&&<Grid item lg={6} sm={6} sx={12}>
                <TextField
                fullWidth
                id="end"
                name="end"
                label="fin*"
                type='datetime-local'
                InputLabelProps={{
                  shrink: true,
                }}
                value={formik.values.end}
                onChange={formik.handleChange}
                error={formik.touched.end && Boolean(formik.errors.end)}
                helperText={formik.touched.end && formik.errors.end}
                />
              </Grid>}
              <Grid item lg={12} sm={12} sx={12}>
                <TextField
                id="title"
                name="title"
                label="titulo"
                fullWidth
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
                />
              </Grid>
              <Grid item lg={12} sm={12} sx={12}>
                <TextField
                id="description"
                name="description"
                label="descripcion"
                fullWidth
                multiline
                value={formik.values.description}
                onChange={formik.handleChange}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
                />
              </Grid>
              <Grid item lg={12} sm={12} sx={12}>
                <Button 
                fullWidth
                variant='contained'
                color='secondary'
                style={{marginBottom:'5px'}}
                onClick={formik.handleSubmit}
                >
                {(status === 'create' || status === 'scroll' )&&"Enviar" ||
                 status === 'edit'&& "editar"}
                </Button>
              </Grid>
            </Grid>
            </DialogContent>
          </Dialog>
          <Grid item style={{height:`${620}px`}} className="bigCalendar-container">
           { type === 'dark' ? 
           <Calendar
               selectable
               localizer={localizer}
               events={events}
               startAccessor="start"
               endAccessor="end"
               className={dark.calendar}
               onSelectEvent={event => eventDescription(event)}
               onSelectSlot={handleSelect}
               messages={{
                next: "siguiente",
                previous: "anterior",
                today: "Hoy",
                month: "Mes",
                week: "Semana",
                day: "Día"
              }}
            />:
            <Calendar
               selectable
               localizer={localizer}
               events={events}
               startAccessor="start"
               endAccessor="end"
               className={ligth.calendar}
               onSelectEvent={event => eventDescription(event)}
               onSelectSlot={handleSelect}
               messages={{
                next: "siguiente",
                previous: "anterior",
                today: "Hoy",
                month: "Mes",
                week: "Semana",
                day: "Día"
              }}
         />}
          </Grid>
          {!isStudent&&<Grid item>
            <Button
            fullWidth
            color='secondary'
            variant='contained'
            onClick={()=>{
               setStatus('create')
               formik.values.title = "" 
               formik.values.description = ""
               formik.values.start = ""
               formik.values.end = ""
               setOpen(true)
            }}
            >
                Agregar evento
            </Button>
          </Grid>}
        </Grid>
    )
  }else{
    return ( 
      <Grid container spacing={2} direction="column">
        <Grid item style={{height:`${620}px`}} className="bigCalendar-container">
         { type === 'dark' ? 
         <Calendar
             localizer={localizer}
             events={events}
             startAccessor="start"
             endAccessor="end"
             className={dark.calendar}
             onSelectEvent={event => eventDescription(event)}
             onSelectSlot={handleSelect}
             messages={{
              next: "siguiente",
              previous: "anterior",
              today: "Hoy",
              month: "Mes",
              week: "Semana",
              day: "Día"
            }}
          />:
          <Calendar
             localizer={localizer}
             events={events}
             startAccessor="start"
             endAccessor="end"
             className={ligth.calendar}
             onSelectEvent={event => eventDescription(event)}
             onSelectSlot={handleSelect}
             messages={{
              next: "siguiente",
              previous: "anterior",
              today: "Hoy",
              month: "Mes",
              week: "Semana",
              day: "Día"
            }}
       />}
        </Grid>
      </Grid>
  )
  }
}

export default NewCalendar
