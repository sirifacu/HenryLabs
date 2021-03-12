import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import { Paper, Button, Dialog, DialogTitle, makeStyles, DialogActions, DialogContent, Select, FormControl, DialogContentText, InputLabel } from '@material-ui/core';
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
    const cohorts = useSelector(state => state.cohortReducer.cohorts)
    const [ open, setOpen ] = useState(false);
    const [ cohort, setCohort ] = useState("");

    const handleClickOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    const handleStudentsToPm = () => {
        if(cohort){
            dispatch(studentToPm(selected, cohort));
            handleClose()
            setCohort("")
        }
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleClickOpen} className={classes.button} startIcon={<PlaylistAddIcon />}>Convertir en PM</Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <Paper elevation={2} className={classes.dialog}>
                    <DialogTitle id="form-dialog-title">Convertir alumnos en PM</DialogTitle> 
                    <DialogContent>
                        <DialogContentText color="primary" className={classes.description}>
                            Designar cohorte al PM
                        </DialogContentText>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel htmlFor="outlined-cohort-native-simple">Cohorte</InputLabel>
                            <Select
                                native
                                
                                fullWidth
                                label="Cohorte"
                                color="primary"
                                value={cohort}
                                onChange={e => setCohort(e.target.value)}
                                inputProps={{
                                    name: 'cohort',
                                    id: 'outlined-cohort-native-simple',
                                }}
                            >
                                <option aria-label="None" value="" />
                                { cohorts.map(cohort => <option  key={cohort.id} value={cohort.id} >{`Cohorte ${cohort.number}`}</option>)}
                            </Select>
                        </FormControl>
                    </DialogContent>                       
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
