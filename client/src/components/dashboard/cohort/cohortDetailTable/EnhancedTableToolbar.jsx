import React from 'react';
import { Grid, lighten, makeStyles, Toolbar, Typography } from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import AddCheckpointsMarks from '../AddCheckpointsMarks'

const useToolbarStyles = makeStyles((theme) => ({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
      borderBottom: "2px solid black"
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      fontWeight: "700",
      flex: '1 1 100%',
    },
    button: {
      margin: theme.spacing(1),
    },
  }));

const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const { numSelected, selected } = props;
  
    return (
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}>
          <Grid container direction="row" alignItems="center" >
            <Grid item xs={3}>
              <Typography className={classes.title} color="inherit" variant="h6" component="div">
              Lista de Alumnos
              </Typography>
            </Grid>
            <Grid item container xs={9} alignItems="center" justify="space-evenly">
              <Grid item>
                <AddCheckpointsMarks selected={selected}/>
              </Grid>
            </Grid> 
          </Grid>
      </Toolbar>
    );
  };
  
  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };

  export default EnhancedTableToolbar;