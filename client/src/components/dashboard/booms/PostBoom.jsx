import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { postBoom } from "../../../redux/boomsReducer/actionsBooms";

const validationSchema = yup.object({
  student: yup
    .string("Ingresa el titulo")
    .min(5, "Muy corto")
    .max(50, "Muy largo (max 30 caracteres)")
    .required("*este campo es obligatorio"),
  job: yup
    .string("Ingrese el tipo")
    .min(1, "Muy corto")
    .max(30, "Muy largo (max 30 caracteres)")
    .required("*este campo es obligatorio"),
  company: yup
    .string("Tipo de contratacion")
    .min(1, "Muy corto")
    .max(30, "Muy largo (max 30 caracteres)")
    .required("*este campo es obligatorio"),
  description: yup
    .string("Descripcion de las tareas")
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
    display: "flex",
    justifyContent: "center",
  },
}));

const PostBoom = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      student: "",
      job: "",
      company: "",
      description: "",
    },

    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(postBoom(values));
      formik.resetForm();
    },
  });

  return (
    <Container component="main">
      <Typography className={classes.paper} component="h1" variant="h5">
        Boom!!
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              color="secondary"
              fullWidth
              id="student"
              label="Alumno"
              value={formik.values.student}
              onChange={formik.handleChange}
              error={formik.touched.student && Boolean(formik.errors.student)}
              helperText={formik.touched.student && formik.errors.student}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              color="secondary"
              fullWidth
              id="job"
              label="Rol"
              value={formik.values.job}
              onChange={formik.handleChange}
              error={formik.touched.job && Boolean(formik.errors.job)}
              helperText={formik.touched.job && formik.errors.job}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              color="secondary"
              fullWidth
              id="company"
              label="Empresa"
              value={formik.values.company}
              onChange={formik.handleChange}
              error={formik.touched.company && Boolean(formik.errors.company)}
              helperText={formik.touched.company && formik.errors.company}
            />
          </Grid>
          <Grid item xs={12} className={classes.spacing}>
            <TextField
              fullWidth
              color="secondary"
              id="description"
              label="Descripción"
              multiline
              rows={6}
              variant="outlined"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
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
  );
};

export default PostBoom;
