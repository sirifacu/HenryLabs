import React from 'react';
import { Container, Grid, Link, Typography } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import IoRocketSharp from 'react-icons';

const FeedbackDetail = ({feedback}) => {
    const {rating, comment, createdAt, user} = feedback;

    return (
        <Grid container direction='column' spacing={1} >
            <Grid item container direction='row' justify='flex-start' alignItems='center'>
                <Container>
                    <Rating 
                        readOnly 
                        value={rating} 
                        precision={0.1}
                        icon={<IoRocketSharp />}
                    />
                </Container>
                <Typography>
                    <Link to={`#/${user.id}`} >{ user.email }</Link> - { createdAt.split('T')[0] } // Create route to see user profile as visitor
                </Typography>
            </Grid>
            <Grid item>
                <Typography>
                    { comment }
                </Typography>
            </Grid>
        </Grid>
    );
};

export default FeedbackDetail;
