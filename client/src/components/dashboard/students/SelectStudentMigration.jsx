import React from 'react';
import { useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';

const SelectStudentMigration = ({selected}) => {
    const cohorts = useSelector(state => state.cohortReducer.cohorts)
    const [ open, setOpen ] = useState(false);
    const [ cohort, setCohort ] = useState("");

    const handleClickOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    const handleMigrateStudents = () => {
        dispatch(migrateStudents(selected, cohort));
    };

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Migrar
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Migrar alumnos</DialogTitle>
                <DialogContent>
                    <DialogContentText className={styles.description}>
                        Cohorte de destino
                    </DialogContentText>
                    <Select 
                        value={cohort}
                        onChange={e => setCohort(e.target.value)}
                    >
                        { cohorts.map(cohort => <MenuItem key={cohort.id} value={cohort.id} >{`Cohorte ${cohort.number}`}</MenuItem>)}
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancelar migración
                    </Button>
                    <Button onClick={handleMigrateStudents} color="primary">
                        Asignar nuevo cohorte
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default SelectStudentMigration;
