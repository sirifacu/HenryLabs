import { Button, Container, Typography } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';

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
  }));

const Students = () => {
    const classes = useStyles();
    return (
        <Container component="main" maxWidth="xs">

           <div className={classes.paper}>
            <Typography variant="h6">Invitar estudiantes a registrarse en la app </Typography><Button className={classes.submit} color="secondary" variant="contained" fullWidth type="submit" component={RouterLink} to="/dashboard/invite">Ir</Button>
            </div>

        </Container>
    )
}

export default Students