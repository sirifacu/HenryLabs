import { Card, CircularProgress, Grid, InputLabel, Select, TextField, MenuItem, FormControl, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup';
import { consoleLog } from '../../../services/consoleLog';
import { getAllCohorts } from '../../../redux/cohortReducer/cohortAction'
import { addLecture } from '../../../redux/lectureReducer/lectureAction'
import AddFilesDashboard from './AddFilesDashboard'
import DoneAllIcon from '@material-ui/icons/DoneAll';



const validationSchema = yup.object({
/*     name: yup
      .string('Tenes que ingresar el nombre de la clase')
      .required('El nombre es obligatorio'),
    number: yup
      .number('Tenes')
      .required('El numero de clase es requerido'),
    cohort: yup
      .number('tenes')
      .required('El cohorte es requerido'),
    videoURL: yup
      .string('tenes')
      .required('El link de la clase es requerido'),  */ 
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
    const [classState, setClassState] = useState(false)
    const formik = useFormik({
        initialValues: {
        title: "",
        module: 0,
        cohort: 0,
        videoURL: "",
        githubURL: "",
        date: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
          console.log(values)
          dispatch(addLecture(values))
          setClassState(true)
        }
    })

    const allCohorts = useSelector(state => state.cohortReducer.allCohorts);


    const handleChangeCohort = (e, id) => {
      console.log("E", e);
      console.log("ID", id);
    }

/*     useEffect(() => {
      dispatch(getAllCohorts())
    }, [dispatch]) */
    // const { title, module, description, videoURL, githubURL, date } = req.body;
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
                    className={classes.inputs}
                    required
                    id="module"
                    label="Módulo"
                    name="module"
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    value={formik.values.module}
                    onChange={formik.handleChange}
                    error={formik.touched.module && Boolean(formik.errors.module)}
                    helperText={formik.touched.module && formik.errors.module}
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
                        <MenuItem key={'cohort'} value={0} >Cohorte 0</MenuItem>
                        { allCohorts.length > 0 && allCohorts.map(cohort => <MenuItem key={cohort.id} value={cohort.num} >{`Cohorte ${cohort.num}`}</MenuItem>)}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>            
              </Grid>
              { classState ? null : <Grid item container xs={12} spacing={2} justify={"center"}>
                <Grid item xs={4}>
                  <Button
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
            </Grid>
          </form>
              <Grid item container xs={12} justify="center">
                {/* <Grid item>
                  <AddFilesDashboard/>
                </Grid> */}
                {classState ? <Grid item>
                  <AddFilesDashboard/>
                </Grid> : null}
              </Grid>
        </Card>
      </>
    );
}

export default AddClass;
