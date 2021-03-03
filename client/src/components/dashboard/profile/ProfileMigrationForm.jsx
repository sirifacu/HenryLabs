import React from 'react';

const ProfileMigrationForm = () => {
    const { match: { params: { id } } } = props;
    const [ open, setOpen ] = useState(false);
    const [ reason, setReason ] = useState("");
    const [ cohort, setCohort ] = useState("");

    const handleClickOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    const handleMigrationRequest = () => dispatch(sendMigrationRequest(id, reason, cohort));

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Formulario de migración
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Migrar</DialogTitle>
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
                    <TextField 
                        value={reason}
                        onChange={e => setReason(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancelar solicitud
                    </Button>
                    <Button onClick={handleMigrationRequest} color="primary">
                        Enviar solicitud
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ProfileMigrationForm;
