import React, { useState } from "react";
import { Button, Dialog, DialogContent, DialogTitle, Slide, 
  IconButton, Container, CssBaseline, TextField, Grid } from "@material-ui/core";
import { useStylesUpdateProfile } from './styles'
import EditIcon from '@material-ui/icons/Edit';
import { useFormik } from "formik";
import * as yup from "yup";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const validationSchema = yup.object({
  firstName: yup
    .string("Enter your first name")
    .min(1, "Very short")
    .required("You must write your first name"),
  lastName: yup
    .string("Enter your last name")
    .min(1, "Very short")
    .required("You must write your last name"),
  country: yup
    .string("Enter your country")
    .min(1, "Very short")
    .required("You must write your country"),
  address: yup
    .string("Enter your address")
    .min(1, "Very short")
    .required("You must write your address"),
  phone: yup.number().min(7).required("Enter your phone number"),
});

export default function UpdateProfile() {
  const classes = useStylesUpdateProfile();
  const [open, setOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      birthDate: "",
      email: "",
      address: "",
      city: "",
      state: "",
      country: "",
      nationality: "",
      description: "",
      cellphone: "",
    },
    validationSchema: validationSchema,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <IconButton aria-label="edit" onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          Actualiza tu información
        </DialogTitle>
        <DialogContent>
          {/* Acá va el contenido */}
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <form className={classes.form} onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      color="secondary"
                      autoComplete="fname"

                      variant="outlined"
                      required
                      fullWidth                      
                      id="name"
                      label="Nombre"
                      name="firstName"
                      autoComplete="firstName"
                      autoFocus
                      value={formik.values.firstName}
                      />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      color="secondary"
                      variant="outlined"
                      required
                      fullWidth
                      id="lastName"
                      label="Apellido"
                      name="lastName"
                      autoComplete="lastName"
                      value={formik.values.lastName}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      color="secondary"
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="EMAIL"
                      name="email"
                      autoComplete="email"
                      value={formik.values.email}
                     />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      color="secondary"
                      variant="outlined"
                      required
                      fullWidth
                      type="date"
                      id="birthDate"
                      label=""
                      name="birthDate"
                      autoComplete="birthDate"
                      value={formik.values.birthDate}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      color="secondary"
                      variant="outlined"
                      required
                      fullWidth
                      id="country"
                      label="País"
                      name="country"
                      autoComplete="country"
                      value={formik.values.country}
                     />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      color="secondary"
                      variant="outlined"
                      required
                      fullWidth
                      id="address"
                      label="Dirección"
                      name="address"
                      autoComplete="address"
                      value={formik.values.address}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      color="secondary"
                      variant="outlined"
                      required
                      fullWidth
                      id="city"
                      label="Ciudad"
                      name="city"
                      autoComplete="city"
                      value={formik.values.city}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      color="secondary"
                      variant="outlined"
                      required
                      fullWidth
                      id="state"
                      label="Provincia"
                      name="state"
                      autoComplete="state"
                      value={formik.values.state}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      color="secondary"
                      variant="outlined"
                      required
                      fullWidth
                      id="nationality"
                      label="Nacionalidad"
                      name="nationality"
                      autoComplete="nationality"
                      value={formik.values.nationality}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      color="secondary"
                      variant="outlined"
                      required
                      fullWidth
                      id="phone"
                      label="Teléfono - Celular"
                      name="phone"
                      autoComplete="phone"
                      value={formik.values.phone}
                    />
                  </Grid>
                  <Grid item xs={12} className={classes.align}>
                    <Button onClick={handleClose} color="secondary">
                      Cancelar
                    </Button>
                    <Button type="submit" color="secondary">
                      Actualizar
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Container>
          {/* Acá termina el contenido */}
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
