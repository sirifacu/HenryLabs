import React from 'react';
import { useDispatch } from 'react-redux';
import { postFeedback } from '../../../redux/feedbackReducer/feedbackAction';
import { Container, Grid, Button } from '@material-ui/core';
import { Rating } from '@material-ui/lab';

const AddFeedback = props => {
    const dispatch = useDispatch();
    const { match: { params: { id } } } = props;
    const [ review, setReview ] = useState();
    const [ comment, setComment ] = useState();

    const handleChangeReview = e => {
        setReview(e.target.value);
    };

    const handleChangeComment = e => {
        setComment(e.target.value);
    };

    const handleEditFeedback = () => {
        dispatch(postFeedback(id));
    };

    return (
        <Container container direction='column' spacing={1} >
            <Grid item justifyContent='center' >
                <Typography>Añadir Reseña</Typography>
            </Grid>
            <Grid item justifyContent='center'>
                <Rating 
                    value={rating}
                    onChange={handleChangeReview}
                />
            </Grid>
            <Grid item justifyContent='center'>
                <TextField 
                    multiline
                    name='comment'
                    value={comment}
                    onChange={handleChangeComment}
                />
            </Grid>
            <Button onClick={handleEditFeedback} >Añadir Reseña</Button>
        </Container>
    );
};

export default AddFeedback;
