import { Box, Button, Container, FormControl, Grid, InputLabel, Select, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useFormik } from "formik";
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { postJob } from '../../../redux/jobsReducer/actionsJobs';

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
    contract: yup
    .string("Tipo de contratacion")
    .min(1, "Muy corto")
    .max(30, "Muy largo (max 30 caracteres)")
    .required("*este campo es obligatorio"),
    webProfile: yup
    .string("Nombre de la empresa")
    .min(6, "Muy corto")
    .max(3000, "Muy largo (max 3000 caracteres)"),
    description: yup
    .string("Descripcion de las tareas")
    .min(1, "Muy corto")
    .max(10000, "Muy largo (max 10000 caracteres)")
      .required("*este campo es obligatorio"),
    requirements: yup
    .string("Requerimientos")
    .min(1, "Muy corto")
    .max(10000, "Muy largo (max 10000 caracteres)")
    .required("*este campo es obligatorio"),
    benefits: yup
    .string("Beneficios")
    .max(10000, "Muy largo (max 10000 caracteres)"),
    salary: yup
    .string("Salario")
    .max(30, "Muy largo (max 30 caracteres)"),
    others: yup
    .string("Otros comentarios")
    .max(10000, "Muy largo (max 10000 caracteres)"),
    language: yup
    .string("Idiomas")
    .max(10000, "Muy largo (max 10000 caracteres)"),
    seniority: yup
    .string("Seniority")
    .max(10000, "Muy largo (max 10000 caracteres)"),
    applyType: yup
    .string("Tipo de Aplicacion")
    .max(100, "Muy largo (max 100 caracteres)")
    .required("*este campo es obligatorio")
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

const PostJob = () => {
    
    const classes = useStyles();
    const dispatch = useDispatch();
    
    const formik = useFormik({
        initialValues: {
          title: "",
          type: "",
          contract: "",
          webProfile: "",
          description: "",
          requirements: "",
          benefits: "",
          salary: "",
          others: "",
          language:"",
          seniority:"",
          applyType:"",

        },
    
    validationSchema: validationSchema,
    onSubmit: (values) => {
        dispatch(postJob(values));
        formik.resetForm()
    }
    })

    return (
        <Container component="main" >
            <Typography className={classes.paper}component="h1" variant="h5">
            Publicar oferta de trabajo
            </Typography>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                    color="secondary"
                    fullWidth
                    id="title"
                    label="Titulo del trabajo"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                    <InputLabel htmlFor="outlined-type-native-simple">
                        Tipo de Trabajo
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
                        <option value={"Remoto"}>Remoto</option>
                        <option value={"Presencial"}>Presencial</option>
                        <option value={"Mixto"}>Mixto</option>
                    </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                    <InputLabel htmlFor="outlined-contract-native-simple">
                        Tipo de contratacion
                    </InputLabel>
                    <Select
                        color="secondary"
                        native
                        inputProps={{
                        name: 'contract',
                        id: 'outlined-contract-native-simple',
                        }}
                        label="contract"
                        value={formik.values.contract}
                        onChange={formik.handleChange}
                    >
                        <option aria-label="None" value="" />
                        <option value={"Full Time"}>Full Time</option>
                        <option value={"Part Time"}>Part Time</option>
                        <option value={"Temporal"}>Temporal</option>
                        <option value={"Pasantía"}>Pasantía</option>
                        <option value={"Otros"}>Otros</option>
                    </Select>
                    </FormControl>
                    <FormControl fullWidth>
                    <InputLabel htmlFor="outlined-contract-native-simple">
                        Seniority
                    </InputLabel>
                    <Select
                        color="secondary"
                        native
                        inputProps={{
                        name: 'seniority',
                        id: 'outlined-seniority-native-simple',
                        }}
                        label="seniority"
                        value={formik.values.seniority}
                        onChange={formik.handleChange}>
                        <option aria-label="None" value="" />
                        <option value={"Trainee"}>Trainee</option>
                        <option value={"Junior"}>Junior</option>
                        <option value={"SemiSenior"}>SemiSenior</option>
                        <option value={"Senior"}>Senior</option>
                        <option value={"Lead"}>Lead</option>
                    </Select>
                    </FormControl>
                    <FormControl fullWidth>
                    <InputLabel htmlFor="outlined-contract-native-simple">
                        Tipo de Aplicacion
                    </InputLabel>
                    <Select
                        color="secondary"
                        native
                        inputProps={{
                        name: 'applyType',
                        id: 'outlined-applyType-native-simple',
                        }}
                        label="applyType"
                        value={formik.values.applyType}
                        onChange={formik.handleChange}>
                        <option aria-label="None" value="" />
                        <option value={"easyApply"}>Interna</option>
                        <option value={"apply"}>Externa</option>
                    </Select>
                    </FormControl>
                    {formik.values.applyType !== "easyApply" && (
                <Grid item xs={12}>
                    <TextField
                    color="secondary"
                    fullWidth
                    id="webProfile"
                    label="Link para aplicar"
                    value={formik.values.webProfile}
                    onChange={formik.handleChange}
                    error={formik.touched.webProfile && Boolean(formik.errors.webProfile)}
                    helperText={formik.touched.webProfile && formik.errors.webProfile}
                    />
                </Grid>)}
                <Grid item xs={12}>
                    <TextField
                    color="secondary"
                    fullWidth
                    id="language"
                    label="Idiomas"
                    value={formik.values.language}
                    onChange={formik.handleChange}
                    error={formik.touched.language && Boolean(formik.errors.language)}
                    helperText={formik.touched.language && formik.errors.language}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    color="secondary"
                    fullWidth
                    id="salary"
                    label="Sueldo"
                    value={formik.values.salary}
                    onChange={formik.handleChange}
                    error={formik.touched.salary && Boolean(formik.errors.salary)}
                    helperText={formik.touched.salary && formik.errors.salary}
                    />
                </Grid>
                <Grid item xs={12} className={classes.spacing}>
                            <TextField
                            fullWidth
                            color="secondary"
                            id="description"
                            label="Descripción del puesto"
                            multiline
                            rows={6}
                            variant="outlined"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                            />
                </Grid>
                <Grid item xs={12} className={classes.spacing}>
                            <TextField
                            fullWidth
                            color="secondary"
                            id="requirements"
                            label="Requerimientos tecnicos del puesto"
                            multiline
                            rows={6}
                            variant="outlined"
                            value={formik.values.requirements}
                            onChange={formik.handleChange}
                            error={formik.touched.requirements && Boolean(formik.errors.requirements)}
                            helperText={formik.touched.requirements && formik.errors.requirements}
                            />
                </Grid>
                <Grid item xs={12} className={classes.spacing}>
                            <TextField
                            fullWidth
                            color="secondary"
                            id="benefits"
                            label="Beneficios del puesto"
                            multiline
                            rows={6}
                            variant="outlined"
                            value={formik.values.benefits}
                            onChange={formik.handleChange}
                            error={formik.touched.benefits && Boolean(formik.errors.benefits)}
                            helperText={formik.touched.benefits && formik.errors.benefits}
                            />
                </Grid>
                <Grid item xs={12} className={classes.spacing}>
                            <TextField
                            fullWidth
                            color="secondary"
                            id="others"
                            label="Otros comentarios"
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
                    Publicar
                </Button>
                </Box>
            </form>
    </Container>
    )
}

export default PostJob