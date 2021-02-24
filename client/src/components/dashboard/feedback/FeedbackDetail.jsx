import React from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

const FeedbackDetail = ({feedback}) => {
    const {rating, comment, createdAt, user} = feedback;

    return (
        <Grid container direction='column' spacing={1} >
            <Grid item container direction='row' justify='flex-start' alignItems='center'>
                <Container>
                    <Rating readOnly value={rating} precision={0.1} />
                </Container>
                <Typography>
                    
                </Typography>
            </Grid>
        </Grid>
    );
};

export default FeedbackDetail;
