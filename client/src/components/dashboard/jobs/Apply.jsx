import React, { useState, useSelector } from 'react'
import { Box, Button, Container, FormControl, Grid, InputLabel, Select, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useFormik } from "formik";
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";
import * as yup from "yup";

const validationSchema = yup.object({
    english: yup
    .string("Ingrese el tipo")
    .min(1, "Muy corto")
    .max(30, "Muy largo (max 30 caracteres)")
    .required("*este campo es obligatorio"),
    webProfile: yup
    .string("Nombre de la empresa")
    .min(6, "Muy corto")
    .max(100, "Muy largo (max 100 caracteres)"),
    others: yup
    .string("Otros comentarios")
    .max(500, "Muy largo (max 500 caracteres)"),
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
}));


export const Apply = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const { id } = useParams();
    
    const formik = useFormik({
        initialValues: {
          english: "",
          webProfile: "",
          others: "",
        },
    
    validationSchema: validationSchema,
    onSubmit: (values) => {
        console.log(values)
        //dispatch(applyJob(values));
        //formik.resetForm()
        //history.push('/dashboard/joblist/')
    }
    })

    return (
        <Container component="main" >
                <Typography className={classes.paper}component="h1" variant="h5">
                Postularse para este trabajo
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                                <Grid item xs={12}>
                                    <TextField
                                    color="secondary"
                                    fullWidth
                                    id="webProfile"
                                    label="*Linkedin"
                                    value={formik.values.webProfile}
                                    onChange={formik.handleChange}
                                    error={formik.touched.webProfile && Boolean(formik.errors.webProfile)}
                                    helperText={formik.touched.webProfile && formik.errors.webProfile}
                                    />
                                </Grid>
                        </Grid>
                    <Grid item xs={12}>                   
                        <FormControl fullWidth>
                        <InputLabel htmlFor="outlined-english-native-simple">
                            *Nivel de Ingles
                        </InputLabel>
                        <Select
                            color="secondary"
                            native
                            inputProps={{
                            name: 'english',
                            id: 'outlined-type-native-simple',
                            }}
                            label="english"
                            value={formik.values.english}
                            onChange={formik.handleChange}
                        >
                            <option aria-label="None" value="" />
                            <option value={"basic"}>Basico</option>
                            <option value={"intermediate"}>Intermedio</option>
                            <option value={"advanced"}>Avanzado</option>
                        </Select>
                        </FormControl>
                    <Grid item xs={12} className={classes.spacing}>
                                <TextField
                                fullWidth
                                color="secondary"
                                id="others"
                                label="*Otros comentarios"
                                multiline
                                rows={6}
                                variant="outlined"
                                value={formik.values.others}
                                onChange={formik.handleChange}
                                error={formik.touched.others && Boolean(formik.errors.others)}
                                helperText={formik.touched.others && formik.errors.others}
                                />
                    </Grid>
                </Grid>
                </Grid>
                    <Box className={classes.button}>
                        <Button variant="contained" color="secondary" type="submit">
                            Enviar
                        </Button>
                    </Box>
                </form>
        </Container>
    )
}
