import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { IoRocketSharp } from 'react-icons/io5';
import { feedbackResumeStyles } from './styles';

const FeedbacksResume = ({ averageRating }) => {
    const dispatch = useDispatch();
    const styles = feedbackResumeStyles();

    return (
        <Container className={styles.container} >
            <Typography variant='h1' align='center' >{ averageRating.toFixed(1) }</Typography>
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
