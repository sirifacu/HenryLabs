import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import { Paper, Button, Dialog, DialogTitle, makeStyles, DialogActions } from '@material-ui/core';
import { studentToPm } from '../../../redux/studentReducer/studentAction';


const useToolbarStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
    dialog:{
        backgroundColor: theme.palette.grey[500]
    },
    formControl: {

        width: "100%",
      },
  }));

const SelectStudentToPm = ({selected}) => {
    const classes = useToolbarStyles()
    const dispatch = useDispatch()
    const [ open, setOpen ] = useState(false);

    const handleClickOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    const handleStudentsToPm = () => {
        dispatch(studentToPm(selected));
        handleClose()
        return
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleClickOpen} className={classes.button} startIcon={<PlaylistAddIcon />}>Convertir en PM</Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <Paper elevation={2} className={classes.dialog}>
                    <DialogTitle id="form-dialog-title">Convertir alumnos en PM</DialogTitle>                        
                    <DialogActions>
                        <Button variant="contained" onClick={handleClose} color="primary">
                            Cancelar
                        </Button>
                        <Button  variant="contained" onClick={handleStudentsToPm} color="primary">
                            Convertir a PM
                        </Button>
                    </DialogActions>
                </Paper>
            </Dialog>
        </div>
    );
};

export default SelectStudentToPm;
