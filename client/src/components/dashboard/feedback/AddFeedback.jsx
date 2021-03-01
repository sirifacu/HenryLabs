import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeFeedback, getFeedbackFromUser, postFeedback } from '../../../redux/feedbackReducer/feedbackAction';
import { Container, Grid, Button, Typography, TextField } from '@material-ui/core';
import { Rating } from '@material-ui/lab';

const AddFeedback = props => {
    const dispatch = useDispatch();
    const { lectureId } = props;
    const [ rating, setRating ] = useState();
    const [ comment, setComment ] = useState();
    const [ toEdit, setToEdit ] = useState(false);
    const feedback = useSelector(state => state.feedbackReducer.feedBackUser);
    const userId = useSelector(state => state.userLoggedIn.userInfo.id)

    useEffect(() => {
        dispatch(getFeedbackFromUser(lectureId, userId));
    }, [dispatch, userId, lectureId]);

    useEffect(() => {
        setRating(feedback.rating ? feedback.rating : 0)
        console.log(feedback)
    }, [feedback]);

    const handleChangeRating = e => {
        setRating(e.target.value);
    };

    const handleChangeComment = e => {
        setComment(e.target.value);
    };

    const handleEdit = () => {
        setToEdit(true);
    };

    const handleAddFeedback = () => {
        dispatch(postFeedback(userId, rating, comment, lectureId)); // userId left;
    };

    const handleEditFeedback = () => {
        dispatch(changeFeedback(feedback.id, rating, comment));
    };

    return (
        <Container container direction='column' spacing={1} >
            <Grid item justifyContent='center' >
                <Typography>{toEdit ? 'Tu reseña' : 'Añadir Reseña'}</Typography>
            </Grid>
            <Grid item justifyContent='center'>
                <Rating
                    readOnly={feedback && !toEdit ? true : false}
                    value={rating}
                    onChange={handleChangeRating}
                />
            </Grid>
            <Grid item justifyContent='center'>
                <TextField
                    disabled={feedback && !toEdit ? true : false}
                    multiline
                    name='comment'
                    value={feedback ? feedback.comment : comment}
                    onChange={handleChangeComment}
                />
            </Grid>
            {
                feedback && !toEdit
                ? <Button onClick={handleEdit} >Editar</Button>
                : <Button onClick={toEdit ? handleEditFeedback : handleAddFeedback} >{toEdit ? 'Editar reseña' : 'Añadir Reseña'}</Button>
            }
        </Container>
    );
};

export default AddFeedback;
