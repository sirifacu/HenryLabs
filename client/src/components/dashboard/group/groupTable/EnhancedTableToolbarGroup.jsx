import { enhancedTableToolbarGroupStyles } from '../styles'
import {Toolbar, Typography, Grid} from '@material-ui/core'
import React from 'react'


const EnhancedTableToolbarGroup = () => {
    const classes = enhancedTableToolbarGroupStyles();
    return (
      <Toolbar className={classes.toolbarTable}>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={12}>
            <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
              Todos los Grupos
            </Typography> 
          </Grid>
        </Grid>
    </Toolbar>
    );
  };

export default EnhancedTableToolbarGroup