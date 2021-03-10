import { Container, Button, Dialog, Paper, DialogContent, DialogTitle, 
         DialogContentText } from '@material-ui/core';
import { feedbacksCohort } from '../styles';
import { getAllFeedbacks } from '../../../../redux/feedbackReducer/feedbackAction';
import { useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';

const SeeAllFeedbacksCohort = () => {
    const dispatch = useDispatch();
    const styles = feedbacksCohort();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        dispatch(getAllFeedbacks());
    }, [dispatch]);

    const handleClickOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);


    return (
        <Container>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                Reseñas
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <Paper elevation={3} className={styles.paper}>
					<DialogTitle className={styles.title} id="form-dialog-title">Reseñas</DialogTitle>
					<DialogContent className={styles.description} >
						<DialogContentText >

						</DialogContentText>
					</DialogContent>
                </Paper>
            </Dialog>
        </Container>
    );
};

export default SeeAllFeedbacksCohort;
