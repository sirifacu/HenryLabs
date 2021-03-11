import { enhancedTableToolbarStyles } from './../styles'
import {Toolbar, Typography, Grid} from '@material-ui/core'
import React from 'react'

const EnhancedTableToolbar = () => {
    const classes = enhancedTableToolbarStyles();
    return (
      <Toolbar className={classes.toolbarTable}>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={12}>
            <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
              Todos los Cohortes
            </Typography> 
          </Grid>
        </Grid>
    </Toolbar>
    );
  };

export default EnhancedTableToolbar;
