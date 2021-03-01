import React, { useState } from 'react';
import { Container, LinearProgress, Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { feedbacksFilterStyles } from './styles';
import { IoRocketSharp } from 'react-icons/io5';

const FeedbacksFilter = ({ feedbacks, setFeedbacks, allFeedbacks }) => {
    const styles = feedbacksFilterStyles();
    const fiveStars = allFeedbacks.reduce((acc, { rating }) => acc + ( rating === 5 ? 1 : 0), 0) / allFeedbacks.length;
    const fourStars = allFeedbacks.reduce((acc, { rating }) => acc + ( rating < 5 && rating >= 4 ? 1 : 0), 0) / allFeedbacks.length;
    const threeStars = allFeedbacks.reduce((acc, { rating }) => acc + ( rating < 4 && rating >= 3 ? 1 : 0), 0) / allFeedbacks.length;
    const twoStars = allFeedbacks.reduce((acc, { rating }) => acc + ( rating < 3 && rating >= 2 ? 1 : 0), 0) / allFeedbacks.length;
    const oneStar = allFeedbacks.reduce((acc, { rating }) => acc + ( rating < 2 && rating >= 1 ? 1 : 0), 0) / allFeedbacks.length;
    const [ selected, setSelected ] = useState(null);
    
    const handleFilterByRating = feedbackRating => {
        if (feedbackRating === selected) {
            setFeedbacks(allFeedbacks)
            setSelected(null);
            return;
        } else if (feedbackRating === 5) {
            setFeedbacks(allFeedbacks.filter(({ rating }) => rating === feedbackRating ));
            setSelected(feedbackRating);
            return;
        }
        else {
            setFeedbacks(allFeedbacks.filter(({rating}) => rating < feedbackRating + 1 && rating >= feedbackRating));
            setSelected(feedbackRating);
            return;
        }
    };

    return (
        <Container className={styles.container} >
            <Container className={selected === 5 ? styles.selected : styles.ratingContainer} onClick={() => handleFilterByRating(5)} >
                <Container className={styles.progressBarContainer} >
                    <LinearProgress variant="determinate" value={fiveStars * 100} className={styles.progressBar} color='secondary' />
                </Container>
                <Rating 
                    readOnly
                    precision={0.1}
                    value={5}
                    icon={<IoRocketSharp />}
                />
                <Typography className={styles.percentage} >{ fiveStars ? `${(fiveStars * 100).toFixed(1)}%` : '0%' }</Typography>
            </Container>
            <Container className={selected === 4 ? styles.selected : styles.ratingContainer} onClick={() => handleFilterByRating(4)} >
                <Container className={styles.progressBarContainer} >
                    <LinearProgress variant="determinate" value={fourStars * 100} className={styles.progressBar} color='secondary' />
                </Container>
                <Rating 
                    readOnly
                    precision={0.1}
                    value={4}
                    icon={<IoRocketSharp />}
                />
                <Typography className={styles.percentage} >{ fourStars ? `${(fourStars * 100).toFixed(1)}%` : '0%' }</Typography>
            </Container>
            <Container className={selected === 3 ? styles.selected : styles.ratingContainer} onClick={() => handleFilterByRating(3)} >
                <Container className={styles.progressBarContainer} >
                    <LinearProgress variant="determinate" value={threeStars * 100} className={styles.progressBar} color='secondary' />
                </Container>
                <Rating 
                    readOnly
                    precision={0.1}
                    value={3}
                    icon={<IoRocketSharp />}
                />
                <Typography className={styles.percentage} >{ threeStars ? `${(threeStars * 100).toFixed(1)}%` : '0%' }</Typography>
            </Container>
            <Container className={selected === 2 ? styles.selected : styles.ratingContainer} onClick={() => handleFilterByRating(2)} >
                <Container className={styles.progressBarContainer} >
                    <LinearProgress variant="determinate" value={twoStars * 100} className={styles.progressBar} color='secondary' />
                </Container>
                <Rating 
                    readOnly
                    precision={0.1}
                    value={2}
                    icon={<IoRocketSharp />}
                />
                <Typography className={styles.percentage} >{ twoStars ? `${(twoStars * 100).toFixed(1)}%` : '0%' }</Typography>
            </Container>
            <Container className={selected === 1 ? styles.selected : styles.ratingContainer} onClick={() => handleFilterByRating(1)} >
                <Container className={styles.progressBarContainer} >
                    <LinearProgress variant="determinate" value={oneStar * 100} className={styles.progressBar} color='secondary' />
                </Container>
                <Rating 
                    readOnly
                    precision={0.1}
                    value={1}
                    icon={<IoRocketSharp />}
                />
                <Typography className={styles.percentage} >{ oneStar ? `${(oneStar * 100).toFixed(1)}%` : '0%' }</Typography>
            </Container>
        </Container>
    );
};

export default FeedbacksFilter;
