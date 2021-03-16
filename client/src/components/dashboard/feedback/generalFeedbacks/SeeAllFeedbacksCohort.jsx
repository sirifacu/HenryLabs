import { Container, Button, Dialog, Paper, DialogContent, DialogTitle, 
         Select, MenuItem} from '@material-ui/core';
import { AllFeedbacksCohortStyles } from '../styles';
import { getAllFeedbacks } from '../../../../redux/feedbackReducer/feedbackAction';
import { useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import AllFeedbacksResume from './AllFeedbacksResume';
import AllFeedbacksFilter from './AllFeedbacksFilter';

const SeeAllFeedbacksCohort = () => {
    const dispatch = useDispatch();
    const styles = AllFeedbacksCohortStyles();
    const [ open, setOpen ] = useState(false);
    const [ ratingType, setRatingType ] = useState("");

    useEffect(() => {
        dispatch(getAllFeedbacks());
    }, [dispatch]);

    const handleClickOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    const handleRatingType = e => {
        console.log(e.target.value);
        setRatingType(e.target.value);
    };

    // TODO pass AverageRating to AllFeedbacksResume
    return (
        <Container>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                Reseñas
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <Paper elevation={3} className={styles.paper}>
					<DialogTitle className={styles.title} id="form-dialog-title">Reseñas</DialogTitle>
					<DialogContent className={styles.description} >
                        <Select
                            fullWidth
                            id="rating-type"
                            value={ratingType}
                            onChange={handleRatingType}
                        >
                            <MenuItem value={"content"} >Reseñas de contenidos</MenuItem>
                            <MenuItem value={"instructor"} >Reseñas de instructores</MenuItem>
                        </Select>
					</DialogContent>
					<DialogContent className={styles.description} >
                        <AllFeedbacksResume averageRating={undefined} />
                        <AllFeedbacksFilter />
					</DialogContent>
                </Paper>
            </Dialog>
        </Container>
    );
};

export default SeeAllFeedbacksCohort;
