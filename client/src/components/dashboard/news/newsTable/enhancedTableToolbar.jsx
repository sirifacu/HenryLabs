import { enhancedTableToolbarStyles } from '../styles'
import { Toolbar, Typography, Grid } from '@material-ui/core'
import React from 'react'

const EnhancedTableToolbar = () => {

    const classes = enhancedTableToolbarStyles();

    return (
      <Toolbar>
        <Grid container direction="row" justify="center" alignItems="center">
            <Typography className={classes.title} variant="h5" id="tableTitle" component="div">
              Noticias
            </Typography> 
        </Grid>
    </Toolbar>
    );
  };

export default EnhancedTableToolbar;
