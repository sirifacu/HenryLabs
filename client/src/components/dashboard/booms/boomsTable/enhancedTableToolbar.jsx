import React from 'react'
import { useDispatch } from 'react-redux'
import { getBoomsByStatus, getBooms } from '../../../../redux/boomsReducer/actionsBooms'
import { enhancedTableToolbarStyles } from '../styles'
import { Toolbar, Typography, Grid, Button } from '@material-ui/core'

const EnhancedTableToolbar = () => {

    const classes = enhancedTableToolbarStyles();
    const dispatch = useDispatch()

    return (
      <Toolbar>
        <Grid container direction="row">
          <Grid item lg={6} sm={6} sx={6}>
            <Typography className={classes.title} variant="h5" id="tableTitle" component="div" align="left">
              Booms
            </Typography>
          </Grid> 
        <Grid item lg={6} sm={6} sx={6} className={classes.buttons}>
            <Button onClick={() => {dispatch(getBoomsByStatus('Aceptado'))} }>Aceptados</Button>
            <Button onClick={() => {dispatch(getBoomsByStatus('Pendiente'))} }>Pendientes</Button>
            <Button onClick={() => {dispatch(getBoomsByStatus('Rechazado'))} }>Rechazados</Button>
            <Button onClick={() => {dispatch(getBooms())} }>Todos</Button>
        </Grid>    
        </Grid>
    </Toolbar>
    );
  };

export default EnhancedTableToolbar;
