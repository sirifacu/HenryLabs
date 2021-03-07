import { Card, Grid, InputLabel, Select, TextField, MenuItem, FormControl, Button, 
         Snackbar } from '@material-ui/core';
import { addLecturesStyles } from './styles';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup';
import { getCohorts } from '../../../redux/cohortReducer/cohortAction'
import { addLecture, deleteLecture } from '../../../redux/lectureReducer/lectureAction'
import AddFilesDashboard from './AddFilesDashboard'
import DoneAllIcon from '@material-ui/icons/DoneAll';
import ClearIcon from '@material-ui/icons/Clear';
import {useHistory} from 'react-router-dom'
import Swal from 'sweetalert2'
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const validationSchema = yup.object({
    title: yup
      .string('Tenes que ingresar el nombre de la clase')
      .required('El nombre es obligatorio'),
    module: yup
      .number('Tenes que ingresar numero de clase')
      .typeError('Tienes que ingresar un Numero')
      .min(1, "Tiene que ser mayor a 0")
      .required('El numero de clase es requerido'),
    cohort: yup
      .string('Tenes que seleccionar un cohorte')
      .required('El cohorte es requerido'),
    videoURL: yup
      .string('Tenes que ingresar el link de la clase')
      .required('El link de la clase es requerido'), 
});

const AddLecture = () => {
    const dispatch = useDispatch();
    const classes = addLecturesStyles();
    const history = useHistory()
    const [openAlertUpload, setOpenAlertUpload] = useState(false)
    const [classState, setClassState] = useState(false)
    const formik = useFormik({
        initialValues: {
        title: "",
        module: 0,
        cohort: '',
        videoURL: "",
        githubURL: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
          dispatch(addLecture(values))
          setClassState(true)
        }
    })

    const allCohorts = useSelector(state => state.cohortReducer.cohorts);
    const temporalLecture = useSelector(state => state.lectureReducer.temporalId);

    const handleCancelLecture = () => {
      setClassState(false)
      dispatch(deleteLecture(temporalLecture))
      formik.resetForm({});
    }

    const handleCloseUpload = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpenAlertUpload(false);
    };

    useEffect(() => {
      dispatch(getCohorts())
    }, [dispatch])

    const handleConfirmClass = () => {
        Swal.fire({
          text: "Quieres confirmar esta clase?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Aceptar',
          reverseButtons: true,
        }).then((result) => {
          if (result.isConfirmed) {
            history.push('/dashboard/lista_clases')
          }
        })
    }
    
    return (
      <>
        <Card className={classes.card}>
          <form onSubmit={formik.handleSubmit} noValidate autoComplete="off">
            <Grid container direction="column" justify="space-between" spacing={4}>
              <Grid item container spacing={3} justify="center">
                <Grid item xs={12} sm={8}>
                  <TextField
                    disabled={classState ? true : false}
                    className={classes.inputs}
                    required
                    id="title"
                    label="Nombre"
                    name="title"
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    disabled={classState ? true : false}
                    className={classes.inputs}
                    required
                    id="module"
                    label="Módulo"
                    name="module"
                    variant="outlined"
                    color="secondary"
                    type="number"
                    fullWidth
                    value={formik.values.module}
                    onChange={formik.handleChange}
                    error={formik.touched.module && Boolean(formik.errors.module)}
                    helperText={formik.touched.module && formik.errors.module}
                  />
                </Grid>
                <Grid item container spacing={3} justify="center">
                  <Grid item xs={12} sm={6}>
                    <TextField
                      disabled={classState ? true : false}
                      className={classes.inputs}
                      required
                      id="videoURL"
                      label="Link Vimeo"
                      name="videoURL"
                      variant="outlined"
                      color="secondary"
                      fullWidth
                      value={formik.values.videoURL}
                      onChange={formik.handleChange}
                      error={formik.touched.videoURL && Boolean(formik.errors.videoURL)}
                      helperText={formik.touched.videoURL && formik.errors.videoURL}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      disabled={classState ? true : false}
                      className={classes.inputs}
                      required
                      id="githubURL"
                      label="Link Repositorio"
                      name="githubURL"
                      variant="outlined"
                      color="secondary"
                      fullWidth
                      value={formik.values.githubURL}
                      onChange={formik.handleChange}
                      
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl variant='filled' fullWidth color="secondary" disabled={classState ? true : false}>
                      <InputLabel>Cohorte</InputLabel>
                      <Select
                        id='cohort'
                        name='cohort'
                        value={formik.values.cohort}
                        onChange={formik.handleChange}
                        error={formik.touched.cohort && Boolean(formik.errors.cohort)}
                      >
                        {allCohorts?.map(cohort => <MenuItem key={cohort.id} value={cohort.id} >{`Cohorte ${cohort.number}`}</MenuItem>)}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>           
              </Grid>
              { classState ? null : <Grid item container xs={12} spacing={2} justify={"center"}>
                <Grid item>
                  <Button
                    size="small"
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    startIcon={<DoneAllIcon />}
                    type="submit"
                  >
                    Confirmar Clase
                  </Button>
                </Grid>
              </Grid>}
            </Grid>
          </form>
              <Grid item container xs={12} justify="center" style={{paddingTop: "2%"}}>
                {classState ? 
                <Grid item>
                  <AddFilesDashboard setOpenAlertUpload={setOpenAlertUpload}/>
                </Grid> : null}
              </Grid>
              { classState ? <Grid item container xs={12} spacing={2} justify={"center"} style={{paddingTop: "2%"}} > 
                <Grid item>
                  <Button
                    size="small"
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    startIcon={<ClearIcon />}
                    type={'button'}
                    onClick={handleCancelLecture}
                  >
                    Cancelar
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    size="small"
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    startIcon={<DoneAllIcon />}
                    type={'button'}
                    onClick={handleConfirmClass}
                  >
                    Confirmar
                  </Button>
                </Grid>
              </Grid> : null}
              <Snackbar open={openAlertUpload} autoHideDuration={3000} onClose={() => setOpenAlertUpload(false)}>
                <Alert onClose={handleCloseUpload} severity="success">
                    Todos los archivos subidos con Exito
                </Alert>
            </Snackbar>
        </Card>
      </>
    );
};

export default AddLecture;
