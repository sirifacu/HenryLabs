import { Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@material-ui/core'
import React from "react";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    width: "50%"
  },
  formControl: {
    margin: theme.spacing(3, 0, 2),
    minWidth: "50%",
  },
}));


export const Invite = () => {
  const classes = useStyles();
  const [cohorte, setCohorte] = React.useState('');
  
  const handleChange = (event) => {
    setCohorte(event.target.value);
  };
    
  return (
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
               <Typography className={classes.paper}>Al hacer click se enviara un email a todos los alumnos asignados al cohorte seleccionado, invitandolos a que se registren en la HenryApp</Typography>
            
            <FormControl variant="filled" className={classes.formControl}>
              <InputLabel id="demo-simple-select-filled-label">Cohorte</InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={"cohorte"}
                color="secondary"
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>Seleccione</em>
                </MenuItem>
                <MenuItem value={10}>Cohorte 15</MenuItem>
                <MenuItem value={20}>Cohorte 16</MenuItem>
                <MenuItem value={30}>Cohorte 17</MenuItem>
              </Select>
            </FormControl>

               <Button className={classes.submit} color="secondary" variant="contained" fullWidth>Invitar</Button>
        </div>
      </Container>
    )
}
