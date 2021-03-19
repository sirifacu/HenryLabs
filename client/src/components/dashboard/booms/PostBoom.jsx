import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { postBoom } from "../../../redux/boomsReducer/actionsBooms";
import { useStylesPostBoom, validationSchema } from "./styles";


const PostBoom = () => {
  const classes = useStylesPostBoom();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      student: "",
      previousStudies: "",
      position: "",
      company: "",
      country: "",
      incomeImprovement: "",
      whatYouDidBefore: "",
      thanks: "",
      comments: "",
      createdAt: ""
    },

    validationSchema: validationSchema,
    onSubmit: (values) => {
      values.createdAt = new Date()
      dispatch(postBoom(values));
      formik.resetForm();
    },
  });

  return (
    <Container component="main">
      <Typography className={classes.paper} component="h1" variant="h5">
      💥Boom💥
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
              id="previousStudies"
              label="¿Qué estudiabas antes?"
              value={formik.values.previousStudies}
              onChange={formik.handleChange}
              error={
                formik.touched.previousStudies &&
                Boolean(formik.errors.previousStudies)
              }
              helperText={
                formik.touched.previousStudies && formik.errors.previousStudies
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              color="secondary"
              fullWidth
              id="position"
              label="¿Para qué puesto te contrataron?"
              value={formik.values.position}
              onChange={formik.handleChange}
              error={formik.touched.position && Boolean(formik.errors.position)}
              helperText={formik.touched.position && formik.errors.position}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              color="secondary"
              fullWidth
              id="company"
              label="¿Para qué Empresa?"
              value={formik.values.company}
              onChange={formik.handleChange}
              error={formik.touched.company && Boolean(formik.errors.company)}
              helperText={formik.touched.company && formik.errors.company}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              color="secondary"
              fullWidth
              id="country"
              label="¿Para qué país?"
              value={formik.values.country}
              onChange={formik.handleChange}
              error={formik.touched.country && Boolean(formik.errors.country)}
              helperText={formik.touched.country && formik.errors.country}
            />
          </Grid>
          <Grid item xs={12} className={classes.spacing}>
            <TextField
              fullWidth
              color="secondary"
              id="incomeImprovement"
              label="¿En cuánto mejoraste tus ingresos?"
              multiline
              rows={6}
              variant="outlined"
              value={formik.values.incomeImprovement}
              onChange={formik.handleChange}
              error={
                formik.touched.incomeImprovement &&
                Boolean(formik.errors.incomeImprovement)
              }
              helperText={
                formik.touched.incomeImprovement &&
                formik.errors.incomeImprovement
              }
            />
          </Grid>
          <Grid item xs={12} className={classes.spacing}>
            <TextField
              fullWidth
              color="secondary"
              id="whatYouDidBefore"
              label="¿Qué hacías antes de henry?"
              multiline
              rows={6}
              variant="outlined"
              value={formik.values.whatYouDidBefore}
              onChange={formik.handleChange}
              error={
                formik.touched.whatYouDidBefore &&
                Boolean(formik.errors.whatYouDidBefore)
              }
              helperText={
                formik.touched.whatYouDidBefore &&
                formik.errors.whatYouDidBefore
              }
            />
          </Grid>
          <Grid item xs={12} className={classes.spacing}>
            <TextField
              fullWidth
              color="secondary"
              id="thanks"
              label="¿A quién agradecerías?"
              multiline
              rows={6}
              variant="outlined"
              value={formik.values.thanks}
              onChange={formik.handleChange}
              error={formik.touched.thanks && Boolean(formik.errors.thanks)}
              helperText={formik.touched.thanks && formik.errors.thanks}
            />
          </Grid>
          <Grid item xs={12} className={classes.spacing}>
            <TextField
              fullWidth
              color="secondary"
              id="comments"
              label="¿Otro comentario?"
              multiline
              rows={6}
              variant="outlined"
              value={formik.values.comments}
              onChange={formik.handleChange}
              error={formik.touched.comments && Boolean(formik.errors.comments)}
              helperText={formik.touched.comments && formik.errors.comments}
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
