import React, { useState } from "react";
import { useStylesUpdateProfile } from "./styles"
import EditIcon from '@material-ui/icons/Edit';
import { Button, Dialog, DialogContent, DialogTitle,
  Slide, IconButton, Container, CssBaseline, TextField, Grid} from "@material-ui/core";
import {updateUser} from "../../../redux/userReducer/userAction";
import { useDispatch, useSelector } from 'react-redux';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



export default function UpdateProfile() {
  const dispatch = useDispatch();
  const classes = useStylesUpdateProfile();
  const user = useSelector(store => store.userLoggedIn.userInfo)
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    address: "",
    city: "",
    state: "",
    country: "",
    nationality: "",
    cellphone: ""
  });
  
  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };
  
  const handleOnChange = (event) => {
    setUserData({...userData,
      [event.target.name]: event.target.value
    });
  }
  const handleSubmitData = async(event) => {
    event.preventDefault();
    await setUserData({...userData,
      [event.target.name]: event.target.value
    });
  
   dispatch(updateUser(user.id, userData));
    setOpen(false);
  }
  
  
  
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
              <form className={classes.form} onSubmit={handleSubmitData}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      color="secondary"
                      variant="outlined"
                      required
                      fullWidth
                      id="name"
                      label="Nombre"
                      name="firstName"
                      autoComplete="firstName"
                      autoFocus
                      value={userData.firstName}
                      onChange={handleOnChange}
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
                      value={userData.lastName}
                      onChange={handleOnChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      color="secondary"
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="email"
                      name="email"
                      autoComplete="email"
                      value={userData.email}
                      onChange={handleOnChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      color="secondary"
                      variant="outlined"
                      required
                      fullWidth
                      type="date"
                      id="date"
                      label="Fecha de Nacimiento"
                      name="dateOfBirth"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      autoComplete="dateOfBirth"
                      value={userData.dateOfBirth}
                      onChange={handleOnChange}
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
                      value={userData.country}
                      onChange={handleOnChange}
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
                      value={userData.address}
                      onChange={handleOnChange}
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
                      value={userData.city}
                      onChange={handleOnChange}
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
                      value={userData.state}
                      onChange={handleOnChange}
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
                      value={userData.nationality}
                      onChange={handleOnChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      color="secondary"
                      variant="outlined"
                      required
                      fullWidth
                      id="cellphone"
                      label="Teléfono - Celular"
                      name="cellphone"
                      autoComplete="cellphone"
                      value={userData.cellphone}
                      onChange={handleOnChange}
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
