import React, {useState, useCallback} from 'react';
import { Box, Button, Container, FormControl, IconButton, Grid,
         InputLabel, Select, TextField, Typography, LinearProgress } from "@material-ui/core";
import { dropzone, validationSchema, useStylesNewsPost } from "./styles";
import { useDropzone } from "react-dropzone";
import { useDispatch } from 'react-redux';
import { consoleLog } from '../../../services/consoleLog';
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import { postNews } from '../../../redux/newsReducer/newsAction'
import { storage } from '../../../firebase/index';
import DeleteIcon from '@material-ui/icons/Delete';
import firebase from '../../../firebase/index';
import Swal from 'sweetalert2';
import 'draft-js/dist/Draft.css';



const NewsPost = () => {
    const classes = useStylesNewsPost();
    const dispatch = useDispatch();
    const history = useHistory();
    const [ file, setFile ] = useState([]);
    const [ image, setImage ] = useState()
    const [ upload, setUpload ] = useState(false)
    const [ progress, setProgress ] = useState(0)
 
    const formik = useFormik({
        initialValues: {
          title: "",
          type: "",
          link: "",
          description: "",
          image: "",
          createdAt: ""
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
          values.image = image
          values.createdAt = new Date()
          dispatch(postNews(values));
          setImage("")
          setFile([])
          formik.resetForm()
          history.push('/panel/noticias')
        }
    })

    const handleUpdateImage = (file) =>{

      const task = firebase.storage().ref(`/news/${file.name}`).put(file)
  
      task.on(
        'state-change',
        snapshot => {
          setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 200)
          setUpload(true)
        },
        error => {
          consoleLog(error.message)
        },
        async () => {
          await storage
              .ref(`/news`)
              .child(file.name)
              .getDownloadURL()
              .then(url => {
                setImage(url)
                setUpload(false)
              });
        })
    }

    const { getRootProps, getInputProps } = useDropzone({ 
        accept: '.jpg',
        multiple: false,
        onDrop: useCallback(acceptedFiles => {
          const reader = new FileReader();
          reader.onabort = () => consoleLog("file reading was aborted");
          reader.onerror = () => consoleLog("file reading failed");
          reader.onload = () => {
            // csv.parse(reader.result, (err, data) => setUsers([...data]));
          };
          // eslint-disable-next-line no-mixed-operators
          if (acceptedFiles[0] && acceptedFiles[0].size === 0 || acceptedFiles[0] === undefined){
            Swal.fire('Oops...', 'El archivo no es un jpg', 'error')
          }else{
            acceptedFiles.forEach(file => reader.readAsBinaryString(file));
            setFile(acceptedFiles)
            handleUpdateImage(acceptedFiles[0])
          } 
        }, [])
      });

      const deleteFile = () => {
        setFile([])
        setImage("")
      }

    
    return (
        <Container component="main" >
          <Typography className={classes.paper}component="h1" variant="h5">
          Publicar Noticia
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                    color="secondary"
                    fullWidth
                    id="title"
                    label="Titulo"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                    <InputLabel htmlFor="outlined-type-native-simple">
                        Tipo de Noticia
                    </InputLabel>
                    <Select
                        color="secondary"
                        native
                        inputProps={{
                        name: 'type',
                        id: 'outlined-type-native-simple',
                        }}
                        label="type"
                        value={formik.values.type}
                        onChange={formik.handleChange}
                        error={formik.touched.type && Boolean(formik.errors.type)}
                    >
                        <option aria-label="None" value="" />
                        <option value={"Henry Talk"}>Henry Talk</option>
                        <option value={"Meet Staff"}>Meet Staff</option>
                        <option value={"Anuncio"}>Anuncio Importante</option>
                    </Select>
                    </FormControl>
                </Grid>
            <Grid item xs={12}>
                <Grid item xs={12}>
                    <TextField
                    color="secondary"
                    fullWidth
                    id="link"
                    label="Link a enlace externo"
                    value={formik.values.link}
                    onChange={formik.handleChange}
                    error={formik.touched.link && Boolean(formik.errors.link)}
                    helperText={formik.touched.link && formik.errors.link}
                    />
                </Grid>
                <br></br>
                <Box>
                <div style={dropzone} {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Arrastrá una imagen acá para agregar a la noticia</p>
                    <em>(Solo archivos .JPG serán aceptados)</em>
                </div>
        <Grid className={classes.spacing}>
          { file.length ? 
            <aside>
                <ul>
                    {file.map(item => (
                    <li key={item.path}>
                        {item.name}
                        <IconButton aria-label="delete" onClick={deleteFile}>
                                <DeleteIcon />
                        </IconButton>
                    </li>
                    ))}
                </ul>
            </aside> 
            : 
            null}
        </Grid>
        </Box>
        <Grid item >
          {upload&&<LinearProgress variant="determinate" value={progress}/>}
        </Grid>
                <br></br>
                <Grid item xs={12} className={classes.spacing}>
                            <TextField
                            fullWidth
                            color="secondary"
                            id="description"
                            label="Texto de la noticia"
                            multiline
                            rows={6}
                            variant="outlined"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                            />
                </Grid>
              </Grid>
            </Grid>
                <Box className={classes.button}>
                <Button variant="contained" color="secondary" type="submit">
                    Publicar
                </Button>
                </Box>
            </form>
    </Container>
    )
}

export default NewsPost