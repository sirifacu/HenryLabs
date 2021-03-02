import React, { useState } from "react";
import { useStylesUpdateProfile } from "./styles"
import EditIcon from '@material-ui/icons/Edit';
import { Button, Dialog, DialogContent, DialogTitle,
  Slide, IconButton, Container, CssBaseline, TextField, Grid} from "@material-ui/core";
import { updateUser } from "../../../redux/userReducer/userAction";
import { useDispatch, useSelector } from 'react-redux';
import { updateValidate, validateEmptyField } from "./utils"


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function UpdateProfile() {
  const dispatch = useDispatch();
  const classes = useStylesUpdateProfile();
  const userId = useSelector(store => store.userLoggedIn.userInfo.id)
  const [open, setOpen] = useState(false);
  const [errors , setErrors] = useState({})
  const user = useSelector(state=> state.userReducer.user)
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
    setUserData({...userData, ...user})
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };
  
  const handleOnChange = (event) => {
    setUserData({...userData,
      [event.target.name]: event.target.value
    });
    
    setErrors(updateValidate({...userData,
      [event.target.name]: event.target.value
    }))
  }
  const handleSubmitData = async(event) => {
    event.preventDefault();
    await setUserData({...userData,
      [event.target.name]: event.target.value
    });
  
    setErrors(updateValidate({...userData,
      [event.target.name]: event.target.value
    }))
  
    setErrors(validateEmptyField({...userData,
      [event.target.name]: event.target.value
    }, errors))
  
    if(Object.keys(errors).length === 0){
     dispatch(updateUser(userId, userData));
      setOpen(false);
    }
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
                      fullWidth
                      id="email"
                      label="Email"
                      name="email"
                      error={!!errors.email}
                      helperText={errors.email}
                      autoComplete="email"
                      value={userData.email}
                      onChange={handleOnChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      color="secondary"
                      variant="outlined"
                      fullWidth
                      id="country"
                      label="País"
                      name="country"
                      autoComplete="country"
                      value={userData.country}
                      error={!!errors.country}
                      helperText={errors.country}
                      onChange={handleOnChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      color="secondary"
                      variant="outlined"
                      fullWidth
                      id="address"
                      label="Dirección"
                      name="address"
                      autoComplete="address"
                      value={userData.address}
                      error={!!errors.address}
                      helperText={errors.address}
                      onChange={handleOnChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      color="secondary"
                      variant="outlined"
                      fullWidth
                      id="city"
                      label="Ciudad"
                      name="city"
                      autoComplete="city"
                      value={userData.city}
                      error={!!errors.city}
                      helperText={errors.city}
                      onChange={handleOnChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      color="secondary"
                      variant="outlined"
                      fullWidth
                      id="state"
                      label="Provincia"
                      name="state"
                      autoComplete="state"
                      value={userData.state}
                      error={!!errors.state}
                      helperText={errors.state}
                      onChange={handleOnChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      color="secondary"
                      variant="outlined"
                      fullWidth
                      id="cellphone"
                      label="Teléfono - Celular"
                      name="cellphone"
                      autoComplete="cellphone"
                      value={userData.cellphone}
                      error={!!errors.cellphone}
                      helperText={errors.cellphone}
                      onChange={handleOnChange}
                    />
                  </Grid>
                  <Grid item xs={12} className={classes.align}>
                    <Button onClick={handleClose} variant="contained">
                      Cancelar
                    </Button>
                    &nbsp;&nbsp;
                    <Button type="submit"  variant="contained" color="primary">
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
