import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography } from '@material-ui/core';
import { getAllFeedbacksFromLecture, getAverageFeedbacksFromLecture
        } from '../../../redux/feedbackReducer/feedbackAction';
import { allFeedbacksListStyles } from './styles';
import FeedbacksResume from './FeedbacksResume';
import FeedbacksFilter from './FeedbacksFilter';
import SeeAllFeedbacksLecture from './SeeAllFeedbacksLecture';
import FeedbacksSearchBar from './FeedbacksSearchBar';

const SeeAllFeedbacksWithFilter = ({ lectureId }) => {
    const styles = allFeedbacksListStyles();
    const dispatch = useDispatch();
    const allFeedbacks = useSelector(state => state.feedbackReducer.feedbacksLecture);
    const averageFeedbacksLecture = useSelector(state => state.feedbackReducer.averageFeedbacksLecture);
    const [ feedbacks, setFeedbacks ] = useState([]);
    
    useEffect(() => {
        dispatch(getAllFeedbacksFromLecture(lectureId));
        dispatch(getAverageFeedbacksFromLecture(lectureId));
    }, [dispatch, lectureId]);

    useEffect(() => {
        setFeedbacks(allFeedbacks);
    }, [allFeedbacks]);

    return (
        <Container>
            <Typography>Reseñas de los estudiantes</Typography>
            <Container className={styles.ratingContainer} >
                <FeedbacksResume averageRating={averageFeedbacksLecture} />
                <FeedbacksFilter feedbacks={feedbacks} setFeedbacks={setFeedbacks} allFeedbacks={allFeedbacks} />
            </Container>
            <FeedbacksSearchBar setFeedbacks={setFeedbacks} allFeedbacks={allFeedbacks} />
            <SeeAllFeedbacksLecture feedbacks={feedbacks} />
        </Container>
    );
};

export default SeeAllFeedbacksWithFilter;
