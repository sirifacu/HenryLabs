import { Button, makeStyles } from '@material-ui/core'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom';
import StudentsList from './studentsTable/StudenList';

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
      width: "20%"
    },
    title:{
      color: theme.palette.text.primary
    }
  }));

const Students = () => {
    const classes = useStyles();
    return (
           <div className={classes.paper}>
            <Button 
              className={classes.submit} 
              color="secondary" variant="contained" 
              fullWidth type="submit" 
              component={RouterLink} 
              to="/dashboard/invite">
                Invitar estudiantes
            </Button>
            <StudentsList/>
          </div>
    )
}

export default Students;
