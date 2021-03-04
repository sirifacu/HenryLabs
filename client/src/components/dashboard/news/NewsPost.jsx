import { Box, Button, Container, FormControl, Grid, InputLabel, Select, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useFormik } from "formik";
import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useDispatch } from 'react-redux';
import * as yup from "yup";
import "./editor.css";


const validationSchema = yup.object({
    title: yup
    .string("Ingresa el titulo")
    .min(5, "Muy corto")
    .max(50, "Muy largo (max 30 caracteres)")
    .required("*este campo es obligatorio"),
    type: yup
    .string("Ingrese el tipo")
    .min(1, "Muy corto")
    .max(30, "Muy largo (max 30 caracteres)")
    .required("*este campo es obligatorio"),
    link: yup
    .string("Link a enlace externo")
    .min(6, "Muy corto")
    .max(30, "Muy largo (max 30 caracteres)")
    .required("*este campo es obligatorio"),
    description: yup
    .string("Descripcion de la noticia")
    .min(1, "Muy corto")
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

var temp = ""

const NewsPost = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [htmlEditor, setHtmlEditor] = useState({});
    
    const formik = useFormik({
        initialValues: {
          title: "",
          type: "",
          link: "",
          description: "",
        },
    
    validationSchema: validationSchema,
    onSubmit: (values) => {
        // dispatch(postNews(values));
        // formik.resetForm()
        temp = htmlEditor
        console.log(htmlEditor.blocks)
    }
    })

    const state = (editorState) => {
        setHtmlEditor(editorState)
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
                        <option value={"henryTalk"}>Henry Talk</option>
                        <option value={"meetStaff"}>Meet Staff</option>
                        <option value={"importante"}>Anuncio Importante</option>
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
                <Grid item xs={12} className={classes.spacing}>
                        <TextField
                        fullWidth
                        color="secondary"
                        id="description"
                        label="Descripción de la noticia"
                        multiline
                        rows={6}
                        variant="outlined"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        error={formik.touched.description && Boolean(formik.errors.description)}
                        helperText={formik.touched.description && formik.errors.description}
                        />
                </Grid> 
                <br></br>
                <Editor
                    wrapperClassName="wrapper"
                    editorClassName="editor"
                    toolbarClassName="toolbar"
                    onContentStateChange={state}
                  />
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