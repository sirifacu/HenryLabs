import React, { useEffect, useState, useMemo } from 'react'
import {useParams, useHistory} from 'react-router-dom'
import { editLecturesStyles } from './styles'
import {useSelector, useDispatch} from 'react-redux'
import { getLecture, getFilesByLectures, removePhotoFromLecture,
         updateLecture} from '../../../redux/lectureReducer/lectureAction';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Card, Grid, InputLabel, Select, Paper, TextField,
     IconButton, FormControl, Button, ListItem,List,
     ListItemAvatar,ListItemText , ListItemSecondaryAction,
     Typography, Divider, Link, Snackbar, Dialog, withStyles,
     Fab } from '@material-ui/core';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import Avatar from '@material-ui/core/Avatar';
import MuiAlert from '@material-ui/lab/Alert';
import DeleteIcon from '@material-ui/icons/Delete';
import { getCohorts } from '../../../redux/cohortReducer/cohortAction'
import {AiOutlineFileJpg, AiOutlineFilePdf, AiOutlineFileZip, AiOutlineFile} from 'react-icons/ai'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import { Dashboard } from '@uppy/react'
import firebase from '../../../firebase/index'
import { storage } from '../../../firebase/index'
import axios from 'axios'
import Uppy from '@uppy/core'
import Spanish from '@uppy/locales/lib/es_ES'
import LinearProgress from '@material-ui/core/LinearProgress';
import Url from '@uppy/url'
import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'
import '@uppy/status-bar/dist/style.css'
import Swal from 'sweetalert2';
import { consoleLog } from '../../../services/consoleLog'

const {REACT_APP_SERVER_HOST } = process.env;

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

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 15,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#FFD21A",
  },
}))(LinearProgress);

export const EditLectures = () => {
    const [openImage, setOpenImage] = useState(false);
    const history = useHistory()
    const {idLecture} = useParams()
    const dispatch = useDispatch()
    const classes = editLecturesStyles();
    const [openAlertUpload, setOpenAlertUpload] = useState(false)
    const [openAlert, setOpenAlert] = useState(false)
    const lecture = useSelector(state => state.lectureReducer.lecture)
    const lectureFiles = useSelector(state => state.lectureReducer.lectureFiles)
    const allCohorts = useSelector(state => state.cohortReducer.cohorts);
    const paletteType = useSelector(state => state.darkModeReducer.palette.type);
    const token = useSelector(store => store.userLoggedIn.token)
    const [progress, setProgress] = useState(0)
    let files = [];
    const formik = useFormik({
        initialValues: {
        title: lecture.title || "",
        module: lecture.module || "",
        cohort: lecture.cohortId || "" ,
        description: lecture.description || "",
        videoURL: lecture.videoURL || "",
        githubURL: lecture.githubURL || "" ,
        },
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            dispatch(updateLecture(idLecture,values))
            formik.resetForm({});
            history.push('/dashboard/lista_clases')

            //actualizar
        },
    })

    useEffect(() => {
        dispatch(getCohorts())
        dispatch(getLecture(idLecture))
        dispatch(getFilesByLectures(idLecture))
    },[dispatch, idLecture])

    const getIcon = (extension) =>{
        switch (extension){
            case "jpg":{
                return (<AiOutlineFileJpg/>)
            }
            case "rar":{
                return (<AiOutlineFileZip/>)
            }
            case "zip":{
              return (<AiOutlineFileZip/>)
          }
            case "pdf":{
                return (<AiOutlineFilePdf/>)
            }
            default: return <AiOutlineFile/>
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenAlert(false);
      };

    const handleCloseUpload = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenAlertUpload(false);
      };

    const handleClick = () => {
        setOpenAlert(true);
      };

    const handleClickUpload = () => {
      setOpenAlertUpload(true);
      };
    
    const handleOpenUppy = () => {
        setProgress(0)
        setOpenImage(true)
    }

    const handleCloseUppy = () => {
        setProgress(0)
        setOpenImage(false)
    }

    const handleDeleteFile = (lectureId, itemId) => {
      Swal.fire({
        title: 'Estas seguro?',
        text: "Si presionas aceptar, se va a borrar el archivo de la clase.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Rechazar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(removePhotoFromLecture(lectureId,itemId));
          handleClick()
        }
      })
      
    }

    const uppy = useMemo((id = idLecture) => {return Uppy({debug: false,locale: Spanish})
          .use(Url, {id: 'Url', companionUrl: REACT_APP_SERVER_HOST })
           .on('file-added', (file) => {
            files.push(file);
          })
          .on('file-removed', (file) => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            files = files.filter(({name}) => name !== file.name)
          })
          .on('upload', () => {
             const promises = files.map(file => {
              return new Promise((resolve, reject) => {
                const fileUploaded = firebase.storage().ref(`lecture/${idLecture}/${file.name}`).put(file.data);
                fileUploaded.on (
                  "state_changed",
                  snapshot => {
                    setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                  },
                  error => {reject(error)},
                  async () => {
                      await storage
                          .ref(`/lecture/${idLecture}`)
                          .child(file.name)
                          .getDownloadURL()
                          .then(url => {
                              const fileName = file.name.split('.')[0];
                              const fileExtension = file.name.split('.')[1];
                              resolve(axios.post(`/files/add/${id}`,
                                {name: fileName, url, extension: fileExtension},
                                { headers: {'Authorization': 'Bearer ' + token }})
                              .catch(err => consoleLog(err)));
                          });
                  }
              )
              })
            })
            Promise.all(promises).then(() => {
              uppy.reset()
              dispatch(getFilesByLectures(idLecture))
              handleCloseUppy()
              handleClickUpload()
            });
          })
      }, [idLecture])

    const uppyModal = (
            <Dialog
              open={openImage}
              onClose={handleCloseUppy}
              aria-labelledby="max-width-dialog-title"
              maxWidth={"md"}
              onBackdropClick={handleCloseUppy}
              onEscapeKeyDown={handleCloseUppy}
              children={Dashboard}
            >
              <Paper elevation={5} style={{marginBottom:"1%"}}>
                <Dashboard
                  theme = {paletteType}
                  width = {"400"}
                  height = {350}
                  uppy={uppy}
                  plugins={['Url']}
                />
              </Paper>
              <BorderLinearProgress variant="determinate" value={progress} />
            </Dialog>
    )

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
                    <FormControl variant='filled' fullWidth color="secondary">
                      <InputLabel>Cohorte</InputLabel>
                      <Select
                        native
                        id='cohort'
                        name='cohort'
                        value={formik.values.cohort}
                        onChange={formik.handleChange}
                        error={formik.touched.cohort && Boolean(formik.errors.cohort)}
                      >
                        <option aria-label="None" value="" />
                        {allCohorts?.map(item => <option key={item.id} value={item.id} >{`Cohorte ${item.number}`}</option>)}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Paper elevation={4} style={{margin:"5%"}} >
                <Grid container justify="center" spacing={2}>
                    <Grid item container xs={10} direction={"column"}>
                        <div style={{display:"flex", justifyContent:"center"}}>
                            <Typography variant="h6" className={classes.title}>
                                Archivos de la clase
                            </Typography>
                        </div>
                        <div className={classes.demo}>
                            <List>
                            <Divider></Divider>
                            {lectureFiles.map((item) =>{
                                return(
                                    <div key={item.id}>
                                        <ListItem >
                                            <ListItemAvatar>
                                                <Avatar>
                                                    {getIcon(item.extension)}
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={`${item.name}`}
                                                secondary={
                                                <Link href={`${item.url}`}
                                                    download
                                                    rel="noreferrer"
                                                    target="_blank"
                                                    color="inherit"
                                                    onClick={(e) => e.preventDefault}
                                                    component="a"
                                                >
                                                    Descargar
                                                </Link> }
                                            />
                                            <ListItemSecondaryAction>
                                                <IconButton edge="end" aria-label="delete" onClick={() => {handleDeleteFile(lecture.id,item.id)}}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                        <Divider></Divider>
                                    </div>
                                )
                                })}
                            </List>
                        </div>
                        <Grid item container justify="flex-end">
                            <Grid item xs={5}>
                                <Fab
                                    variant="extended"
                                    size="small"
                                    color="primary"
                                    aria-label="add"
                                    className={classes.margin}
                                    onClick={handleOpenUppy}
                                    >
                                    <AddAPhotoIcon className={classes.extendedIcon} />
                                      Añadir Archivos
                                </Fab>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
            <Grid container spacing={2} justify={"center"}>
                <Grid item>
                    <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<DoneAllIcon />}
                        type="submit"
                    >
                        Confirmar Clase
                    </Button>
                    </Grid>
              </Grid>
            </form>
            <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="warning">
                    Imagen borrada de la clase
                </Alert>
            </Snackbar>
            <Snackbar open={openAlertUpload} autoHideDuration={3000} onClose={handleCloseUpload}>
                <Alert onClose={handleCloseUpload} severity="success">
                    Todos los archivos subidos con Exito
                </Alert>
            </Snackbar>
            {uppyModal}
          </Card>
        </>
    )
}

export default EditLectures;
