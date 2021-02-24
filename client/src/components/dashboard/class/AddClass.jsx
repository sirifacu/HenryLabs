import { Card, CircularProgress, Grid, InputLabel, Select, TextField, MenuItem, FormControl } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import firebase from 'firebase/app';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup';
import { consoleLog } from '../../../services/consoleLog';
import { getAllCohorts } from '../../../redux/cohortReducer/cohortAction'
import AddFilesDashboard from './AddFilesDashboard'

const firebaseConfig = {
  apiKey: "AIzaSyDEvpKmxR8uFEXc4YMqOIJLcEVhnA-lnoI",
  authDomain: "development-d831d.firebaseapp.com",
  projectId: "development-d831d",
  storageBucket: "development-d831d.appspot.com",
  messagingSenderId: "403564381464",
  appId: "1:403564381464:web:5c6436cec65a2fa93fca6d",
  measurementId: "G-CF99QJ5D0E"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}


const validationSchema = yup.object({
    name: yup
      .string('Tenes que ingresar el nombre de la clase')
      .required('Name is required')
});
  const useStyles = makeStyles((theme) => ({
     card: {
      maxWidth: "90%",
      margin: "auto",
      marginTop: "1rem",
      padding: "1%"
    },
    margin: {
      margin: theme.spacing(1),
    },
    inputs: {
        height: "50",
    }
  }));

const AddClass = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const formik = useFormik({
        initialValues: {
        name: "",
        number: "",
        cohort: "",
        videoURL: "",
        githubURL: ""
        }})

    const [progress, setProgress] = useState(0);
    const [pdfMessage, setPdfMessage] = useState('');
    const allCohorts = useSelector(state => state.cohortReducer.allCohorts);

    const handleOnChangePDF = e => {
      const file = e.target.files[0];
      const storageRef = firebase.storage().ref(`${formik.values.cohort}/${formik.values.number}/${formik.values.name}/${file.name}`);
      const task = storageRef.put(file);
      
      task.on('state_changed', snapshot => {
        let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setProgress(percentage)
      }, error => {
        setPdfMessage("Ha ocurrido un error subiendo el pdf")
        consoleLog(error)
      }, () => {
        setPdfMessage('El pdf ha sido subido con éxito')
      })
    }

    const handleChangeCohort = (e, id) => {
      console.log("E", e);
      console.log("ID", id);
    }

/*     useEffect(() => {
      dispatch(getAllCohorts())
    }, [dispatch]) */

    return (
      <>
        <Card className={classes.card}>
          <form onSubmit={formik.handleSubmit} noValidate autoComplete="off">
            <Grid container direction="column" justify="space-between" spacing={4}>
              <Grid item container spacing={3} justify="center">
                <Grid item xs={12} sm={8}>
                  <TextField
                    className={classes.inputs}
                    required
                    id="name"
                    label="Nombre"
                    name="name"
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    className={classes.inputs}
                    required
                    id="number"
                    label="Módulo"
                    name="number"
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    value={formik.values.number}
                    onChange={formik.handleChange}
                    error={formik.touched.number && Boolean(formik.errors.number)}
                    helperText={formik.touched.number && formik.errors.number}
                  />
                </Grid>
                <Grid item container spacing={3} justify="center">
                  <Grid item xs={12} sm={8}>
                    <TextField
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
                  <Grid item xs={12} sm={4}>
                    <TextField
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
                      error={formik.touched.githubURL && Boolean(formik.errors.githubURL)}
                      helperText={formik.touched.githubURL && formik.errors.githubURL}
                    />
                  </Grid>
                </Grid>
                <Grid item container spacing={3} justify="center" >
                  <Grid item xs={12} sm={12}>
                    <FormControl variant='filled' fullWidth color="secondary">
                      <InputLabel>Cohorte</InputLabel>
                      <Select
                        labelId='cohort'
                        id='cohort'
                        value={formik.values.cohort}
                        onChange={handleChangeCohort}
                      >
                        <MenuItem key={'cohort'} value={'cohort'} >Cohorte 0</MenuItem>
                        { allCohorts.length > 0 && allCohorts.map(cohort => <MenuItem key={cohort.id} value={cohort.num} >{`Cohorte ${cohort.num}`}</MenuItem>)}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>            
              </Grid>
              {/* <Grid item container xs={12} justify="center">
                <Grid item>
                  {progress === 0 ? null : <CircularProgress value={progress} /> }
                </Grid>
                <Grid item>
                  <input type='file' onChange={e => handleOnChangePDF(e)}/>
                  <span>{pdfMessage}</span>
                </Grid>
              </Grid>
            </Grid> */}
              <Grid item container xs={12} justify="center">
                <Grid item>
                  <AddFilesDashboard/>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Card>
      </>
    );
}

export default AddClass;
