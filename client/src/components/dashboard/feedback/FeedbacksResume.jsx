import { Container, Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import React from 'react';
import { IoRocketSharp } from 'react-icons/io5';
import { feedbackResumeStyles } from './styles';

const FeedbacksResume = ({ averageRating }) => {
    const styles = feedbackResumeStyles();

    return (
        <Container className={styles.container} >
            <Typography variant='h1' align='center' >{ averageRating ? averageRating.toFixed(1) : 0.0 }</Typography>
            <Rating
                className={styles.rating}
                readOnly
                value={Number(averageRating)}
                precision={0.1}
                icon={<IoRocketSharp />}
            />
            <Typography variant='body2' align='center' className={styles.textUnderRating} >Valoración de la lecture</Typography>
        </Container>
    );
};

export default FeedbacksResume;
