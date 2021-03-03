import React from 'react';
import { Container, Grid } from '@material-ui/core';
import FeedbackDetail from './FeedbackDetail';
import { seeAllFeedbacksStyles } from './styles';

const SeeAllFeedbacksLecture = ({ feedbacks }) => {
    const styles = seeAllFeedbacksStyles();

    return (
        <Grid container direction='column' className={styles.feedbacksContainer} >
            { feedbacks.length > 0 ? feedbacks.map(feedback => (
                <Container key={feedback.id} className={styles.feedbackContainer} >
                    <FeedbackDetail feedback={feedback} />
                    <hr />
                </Container>
            ))
            : "Tu búsqueda no ha devuelto ningún resultado con las calificaciones seleccionadas. Prueba a borrar tu selección para ver las reseñas que coincidan con tu búsqueda."}
        </Grid>
    );
};

export default SeeAllFeedbacksLecture;
