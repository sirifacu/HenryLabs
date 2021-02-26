import { Button, Container, FormControl, Grid, InputLabel, Select, TextField, Typography } from "@material-ui/core";
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
      .max(30, "Muy largo (max 30 caracteres)"),
    //   .required("Este campo es obligatorio"),
    type: yup
      .string("Ingrese el tipo")
      .min(1, "Muy corto")
      .max(30, "Muy largo (max 30 caracteres)"),
    //   .required("Este campo es obligatorio"),
    contract: yup
    .string("Tipo de contratacion")
    .min(1, "Muy corto")
    .max(30, "Muy largo (max 30 caracteres)"),
    // .required("Este campo es obligatorio"),
    webProfile: yup
      .string("Nombre de la empresa")
      .min(1, "Muy corto")
      .max(30, "Muy largo (max 30 caracteres)"),
    //   .required("Este campo es obligatorio"),
    description: yup
      .string("Descripcion de las tareas")
      .min(1, "Muy corto")
      .max(3000, "Muy largo (max 30 caracteres)"),
    //   .required("Este campo es obligatorio"),
    requirements: yup
    .string("Requerimientos")
    .min(1, "Muy corto")
    .max(3000, "Muy largo (max 30 caracteres)"),
    // .required("Este campo es obligatorio"),
    benefits: yup
    .string("Beneficios")
    .min(1, "Muy corto")
    .max(3000, "Muy largo (max 30 caracteres)"),
    // .required("Este campo es obligatorio"),
    salary: yup
    .string("Salario")
    .min(1, "Muy corto")
    .max(30, "Muy largo (max 30 caracteres)"),
    // .required("Este campo es obligatorio"),
    others: yup
    .string("Otros comentarios")
    .min(1, "Muy corto")
    .max(3000, "Muy largo (max 30 caracteres)"),
    // .required("Este campo es obligatorio"),
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
}));

const PostJob = () => {
    const history = useHistory();
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
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
        dispatch(postJob(values));
     }
    })

    // una vez que se termine y este funcionando todo hay que descomentar y completar las validaciones en todos los campos

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
                    // required
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
                        value={formik.values.gender}
                        onChange={formik.handleChange}
                    >
                        <option aria-label="None" value="" />
                        <option value={0}>Remoto</option>
                        <option value={1}>Presencial</option>
                        <option value={2}>Mixto</option>
                    </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                    <InputLabel htmlFor="outlined-contract-native-simple">
                        Tipo de contratacion
                    </InputLabel>
                    <Select
                        labelWidth="30"
                        color="secondary"
                        native
                        inputProps={{
                        name: 'contract',
                        id: 'outlined-contract-native-simple',
                        }}
                        label="contract"
                        value={formik.values.gender}
                        onChange={formik.handleChange}
                    >
                        <option aria-label="None" value="" />
                        <option value={0}>Full Time</option>
                        <option value={1}>Part Time</option>
                        <option value={2}>Temporal</option>
                        <option value={3}>Pasantía</option>
                        <option value={4}>Otros</option>
                    </Select>
                    </FormControl>
                <Grid item xs={12}>
                    <TextField
                    color="secondary"
                    // required
                    fullWidth
                    id="webProfile"
                    label="Link al perfil de la empresa"
                    value={formik.values.webProfile}
                    onChange={formik.handleChange}
                    error={formik.touched.webProfile && Boolean(formik.errors.webProfile)}
                    helperText={formik.touched.webProfile && formik.errors.webProfile}
                    />
                </Grid>


                <Grid item xs={12}>
                    <TextField
                    color="secondary"
                    // required
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
                            defaultValue=""
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
                            label="Requerimientos del puesto"
                            multiline
                            rows={6}
                            defaultValue=""
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
                            defaultValue=""
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
                            defaultValue=""
                            variant="outlined"
                            value={formik.values.others}
                            onChange={formik.handleChange}
                            error={formik.touched.others && Boolean(formik.errors.others)}
                            helperText={formik.touched.others && formik.errors.others}
                            />
                </Grid>




                </Grid>
                <Button xs={12} fullWidth variant="contained" color="secondary" type="submit" className={classes.spacing}>
                    Publicar
                </Button>
                </Grid>
            </form>
    </Container>
    )
}

export default PostJob