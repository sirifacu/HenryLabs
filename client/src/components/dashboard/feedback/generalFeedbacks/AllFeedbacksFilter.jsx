import { Container, LinearProgress, Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import React, { useState } from 'react';
import { IoRocketSharp } from 'react-icons/io5';
import { feedbacksFilterStyles } from '../styles';

const AllFeedbacksFilter = ({ data }) => {
    const styles = feedbacksFilterStyles();
    const { fiveStars, fourStars, threeStars, twoStars, oneStar } = data;
    const [ selected, setSelected ] = useState(null);
    
    const handleFilterByRating = feedbackRating => {
        if (feedbackRating === selected) {
            setSelected(null);
            return;
        } else if (feedbackRating === 5) {
            setSelected(feedbackRating);
            return;
        }
        else {
            setSelected(feedbackRating);
            return;
        }
    };

    return (
        <Container className={styles.container} >
            <Container className={selected === 5 ? styles.selected : styles.ratingContainer} onClick={() => handleFilterByRating(5)} >
                <Container className={styles.progressBarContainer} >
                    <LinearProgress variant="determinate" value={fiveStars ? fiveStars * 100 : 0} className={styles.progressBar} color='secondary' />
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
                    <LinearProgress variant="determinate" value={fourStars ? fourStars * 100 : 0} className={styles.progressBar} color='secondary' />
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
                    <LinearProgress variant="determinate" value={threeStars ? threeStars * 100 : 0} className={styles.progressBar} color='secondary' />
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
                    <LinearProgress variant="determinate" value={twoStars ? twoStars * 100 : 0} className={styles.progressBar} color='secondary' />
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
                    <LinearProgress variant="determinate" value={oneStar ? oneStar * 100 : 0} className={styles.progressBar} color='secondary' />
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

export default AllFeedbacksFilter;
