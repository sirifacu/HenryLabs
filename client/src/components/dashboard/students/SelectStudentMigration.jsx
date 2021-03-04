import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import { FormControl, Paper, Button, Dialog,InputLabel, DialogTitle, MenuItem, DialogContentText, DialogContent, makeStyles, Select, DialogActions } from '@material-ui/core';
import { migrateStudents } from '../../../redux/studentReducer/studentAction';
import { getCohorts } from '../../../redux/cohortReducer/cohortAction';

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

const SelectStudentMigration = ({selected}) => {
    const classes = useToolbarStyles()
    const dispatch = useDispatch()
    const cohorts = useSelector(state => state.cohortReducer.cohorts)
    const [ open, setOpen ] = useState(false);
    const [ cohort, setCohort ] = useState("");

    useEffect(() => {
        dispatch(getCohorts());
    }, [dispatch]);

    const handleClickOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    const handleMigrateStudents = () => {
        dispatch(migrateStudents(selected, cohort));
        handleClose()
        setCohort("")
    };

    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleClickOpen} className={classes.button} startIcon={<PlaylistAddIcon />}>Asignar Cohorte o Migrar</Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <Paper elevation={2} className={classes.dialog}>
                    <DialogTitle id="form-dialog-title">Migrar alumnos</DialogTitle>
                    <DialogContent>
                        <DialogContentText color="primary" className={classes.description}>
                            Cohorte de destino
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
                        <Button  variant="contained" onClick={handleMigrateStudents} color="primary">
                            Asignar cohorte
                        </Button>
                    </DialogActions>
                </Paper>
            </Dialog>
        </div>
    );
};

export default SelectStudentMigration;
