import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography, Grid } from '@material-ui/core';
import { getAllFeedbacksFromLecture, getLecture } from '../../../redux/feedbackReducer/feedbackAction';
import FeedbacksResume from './FeedbacksResume';
import FeedbackDetail from './FeedbackDetail';

const SeeAllFeedbacksLecture = props => {
    const dispatch = useDispatch();
    const { match: { params: { id } } } = props;
    const allFeedbacks = useSelector(state => state.feedbackReducer.feedbacksLecture);
    const lecture = useSelector(state => state.lectureReducer.lecture);

    useEffect(() => {
        dispatch(getAllFeedbacksFromLecture(id));
        dispatch(getLecture(id));
    }, [dispatch, id]);

    return (
        <Container>
            <Typography>Reseñas de la clase {lecture?.title}</Typography>
            <Grid container direction='column' alignItems='center' justifyContent='center' >
                <Grid item container >
                    <FeedbacksResume lectureId={id} />
                </Grid>
                {allFeedbacks?.map(feedback => <FeedbackDetail feedback={feedback} />)}
            </Grid>
        </Container>
    );
};

export default SeeAllFeedbacksLecture;
