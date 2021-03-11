import { Button, makeStyles } from '@material-ui/core'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom';
import StudentsList from './studentsTable/StudenList';
import {useSelector} from "react-redux";

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
    const user = useSelector(store => store.userLoggedIn.userInfo) || "";
  
    let roles = [];
    user.roles && user.roles.forEach(role => {
      return roles.push(role.name)
    })
  
    return (
           <div className={classes.paper}>
             {
               roles && roles.includes('staff') ?
              <Button
                className={classes.submit}
                color="secondary" variant="contained"
                fullWidth type="submit"
                component={RouterLink}
                to="/panel/invitar">
                  Invitar estudiantes
              </Button> : ""
            }
            <StudentsList/>
          </div>
    )
}

export default Students;
