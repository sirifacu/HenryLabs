import { IconButton, makeStyles, Toolbar, Tooltip, Typography, lighten, Grid, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import FilterListIcon from '@material-ui/icons/FilterList';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import TimelineIcon from '@material-ui/icons/Timeline';

import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';

const useToolbarStyles = makeStyles((theme) => ({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
      borderBottom: "3px solid black"
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
    const { numSelected } = props;
  
    return (
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        {numSelected > 0 ? (
          <Grid container direction="row" alignItems="center" >
            <Grid item xs={3}>
              <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                {numSelected} seleccionados
              </Typography>
            </Grid>
            <Grid item container xs={9} alignItems="center" justify="space-evenly">
              <Grid item>
                <Button variant="contained" color="primary" className={classes.button} startIcon={<PlaylistAddIcon />}>Asignar Cohorte</Button>
              </Grid>
              <Grid item>
              <Button variant="contained" color="primary" className={classes.button} startIcon={<TimelineIcon />}>Migrar</Button>
              </Grid>

            </Grid>
          </Grid>
        ) : (
          <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
            Lista de Alumnos
          </Typography>
        )}
      </Toolbar>
    );
  };
  
  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };

  export default EnhancedTableToolbar;