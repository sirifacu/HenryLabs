import { Box, Button, Container, FormControl, IconButton, Grid, InputLabel, Select, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import 'draft-js/dist/Draft.css';
import { useFormik } from "formik";
import React, {useState, useCallback} from 'react';
import { useDropzone } from "react-dropzone";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import {postNews} from '../../../redux/newsReducer/newsAction'
import { consoleLog } from '../../../services/consoleLog';
import DeleteIcon from '@material-ui/icons/Delete';
import Swal from 'sweetalert2';

const validationSchema = yup.object({
    title: yup
    .string("Ingresa el titulo")
    .min(5, "Muy corto")
    .max(100, "Muy largo (max 100 caracteres)")
    .required("*este campo es obligatorio"),
    type: yup
    .string("Ingrese el tipo")
    .min(1, "Muy corto")
    .max(30, "Muy largo (max 30 caracteres)")
    .required("*este campo es obligatorio"),
    link: yup
    .string("Link a enlace externo")
    .min(6, "Muy corto")
    .max(100, "Muy largo (max 100 caracteres)")
    .required("*este campo es obligatorio"),
    description: yup
    .string("Texto de la noticia")
    .min(6, "Muy corto")
    .max(10000, "Muy largo (max 10000 caracteres)")
    .required("*este campo es obligatorio"),
  });

const useStyles = makeStyles((theme) => ({
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    spacing: {
        margin: theme.spacing(3),
    },
    paper: {
        marginTop: theme.spacing(4),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      },
    button: {
        margin: theme.spacing(3),
        display: 'flex',
        justifyContent: 'center'
    },
    editor: {
        background: "black",
    }
}));

const dropzone = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: 50,
    padding: "5px",
    borderWidth: "2px",
    borderRadius: "2px",
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out",
  }


const NewsPost = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [file, setFile] = useState([]);
 
    const formik = useFormik({
        initialValues: {
          title: "",
          type: "",
          link: "",
          description: "",
        },
    
    validationSchema: validationSchema,
    onSubmit: (values) => {
       dispatch(postNews(values));
       formik.resetForm()
    }
    })

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
            console.log(acceptedFiles)
          } 
        }, [])
      });

      const deleteFile = () => {
        setFile([])
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