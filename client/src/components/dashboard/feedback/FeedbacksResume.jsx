import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Typography } from '@material-ui/core';
import { getAllFeedbacksFromUser, getAverageFeedbacksFromUser, 
         getAllFeedbacksFromLecture, getAverageFeedbacksFromLecture
       } from '../../../redux/feedbackReducer/feedbackAction';
import { Rating } from '@material-ui/lab';
import IoRocketSharp  from 'react-icons';

const FeedbacksResume = ({lectureId, userId}) => {
    const dispatch = useDispatch();
    const feedbacksUser = useSelector(state => state.feedbackReducer.feedbacksUser).length;
    const averageFeedbacksUser = useSelector(state => state.feedbackReducer.averageFeedbacksUser);
    const feedbacksLecture = useSelector(state => state.feedbackReducer.feedbacksLecture).length;
    const averageFeedbacksLecture = useSelector(state => state.feedbackReducer.averageFeedbacksLecture);

    useEffect(() => {
        if (userId) {
            dispatch(getAllFeedbacksFromUser(userId));
            dispatch(getAverageFeedbacksFromUser(userId));
        } else {
            dispatch(getAllFeedbacksFromLecture(lectureId));
            dispatch(getAverageFeedbacksFromLecture(lectureId));
        };
    }, [dispatch, userId, lectureId]);

    return (
        <Grid container direction='row' alignItems='center' justify='flex-start' spacing={1}>
            <Grid item >
                <Typography variant='h3'>
                    { 
                        averageFeedbacksUser && averageFeedbacksUser > 0 
                        ? averageFeedbacksUser.toFixed(1)
                        : averageFeedbacksLecture && averageFeedbacksLecture > 0 
                        ? averageFeedbacksLecture.toFixed(1)
                        : '0.0'
                    }
                </Typography>
            </Grid>
            <Grid item container direction='column'>
                <Rating 
                    readOnly 
                    precision={0.1} 
                    value={lectureId > 0 ? averageFeedbacksLecture : averageFeedbacksUser}
                    body='body2'
                    icon={<IoRocketSharp />}
                />
                <Typography variant='body2' >
                    Promedio entre {feedbacksUser ? feedbacksUser : feedbacksLecture} reseñas
                </Typography>
            </Grid>
        </Grid>
    );
};

export default FeedbacksResume;
