import React from 'react';
import moment from 'moment';
import { Container, Grid, Link, Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { IoRocketSharp } from 'react-icons/io5';
import { feedbackDetailStyles } from './styles';

const FeedbackDetail = ({feedback}) => {
    const styles = feedbackDetailStyles();
    const {rating, comment, createdAt, user} = feedback;

    return (
        <Grid container direction='column' justify='flex-start' spacing={1} className={styles.container} >
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
                    <Link to={`#/${user.id}`} >{ user.email }</Link> - { moment(createdAt).fromNow() }
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
