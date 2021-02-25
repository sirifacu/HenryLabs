import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeFeedback, getFeedbackFromUser, postFeedback } from '../../../redux/feedbackReducer/feedbackAction';
import { Container, Grid, Button } from '@material-ui/core';
import { Rating } from '@material-ui/lab';

const AddFeedback = props => {
    const dispatch = useDispatch();
    const { match: { params: { id } } } = props;
    const [ rating, setRating ] = useState();
    const [ comment, setComment ] = useState();
    const [ toEdit, setToEdit ] = useState(false);
    const feedback = useSelector(state => state.feedbackReducer.feedbackFromUser);
    // const userId = useSelector(state => state.userReducer.id);

    useEffect(() => {
        dispatch(getFeedbackFromUser(id, userId));
    }, [dispatch, userId, id]);

    useEffect(() => {
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
        dispatch(postFeedback(userId, rating, comment, id)); // userId left;
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
                    value={feedback ? feedback.rating : rating}
                    onChange={handleChangeRating}
                />
            </Grid>
            <Grid item justifyContent='center'>
                <TextField
                    disabled={toEdit ? true : false}
                    multiline
                    name='comment'
                    value={feedback ? feedback.comment : comment}
                    onChange={handleChangeComment}
                />
            </Grid>
            {
                feedback
                ? <Button onClick={handleEdit} >Editar</Button>
                : <Button onClick={toEdit ? handleEditFeedback : handleAddFeedback} >{toEdit ? 'Editar reseña' : 'Añadir Reseña'}</Button>
            }
        </Container>
    );
};

export default AddFeedback;
