import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { IoRocketSharp } from 'react-icons/io5';
import { allFeedbacksResumeStyles } from '../styles';

const AllFeedbacksResume = ({ averageRating }) => {
    const styles = allFeedbacksResumeStyles();

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

export default AllFeedbacksResume;
