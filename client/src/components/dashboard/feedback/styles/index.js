import { makeStyles } from '@material-ui/core';

export const feedbackResumeStyles = makeStyles(theme => ({
    container: {
        margin: '3% 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: 'fit-content',
        maxHeight: 'fit-content',
        paddingRight: '0'
    },
    avgRating: {
        margin: '5% 2%'
    },
    rating: {
        marginTop: '-1%'
    },
    textUnderRating: {
        marginTop: '2%',
        marginBottom: '10%'
    },
}));

export const feedbacksFilterStyles = makeStyles(theme => ({
    container: {
        paddingLeft: '0'
    },
    progressBar: {
        maxWidth: '100%',
        minHeight: '.5rem'
    },
    progressBarContainer: {
        maxWidth: '60%',
        margin: '0'
    },
    ratingContainer: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer'
    },
    percentage: {
        marginLeft: '1%'
    },
    selected: {
        display: 'flex',
        alignItems: 'center',
        transform: 'scale(1.1)',
        cursor: 'pointer'
    }
}));

export const allFeedbacksListStyles = makeStyles(theme => ({
    ratingContainer: {
        display: 'flex',
        alignItems: 'center',
    },
}));

export const feedbackDetailStyles = makeStyles(theme => ({
    container: {
        marginBottom: '3%',
    }
}));

export const seeAllFeedbacksStyles = makeStyles(theme => ({
    feedbacksContainer: {
        display: 'flex',
        alignContent: 'flex-start'
    },
    feedbackContainer: {
        maxWidth: '60%',
    }
}));

export const feedbacksSearchBarStyles = makeStyles(theme => ({
    searchContainer: {
        marginBottom: '3%'
    },
    filter: {
        width: '35%',
        marginLeft: '3%'
    }
}));

export const addFeedbackStyles = makeStyles(theme => ({
    title:{
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.grey[600]
    },
    description: {
        textIndent: '20px',
        paddingLeft: '15px',
        paddingRight: '15px',
        backgroundColor: theme.palette.grey[600]
    },
    paper:{
        backgroundColor: theme.palette.grey[600]
    },
    feedbacks: {
        flexWrap: 'nowrap'
    },
    button: {
        backgroundColor: theme.palette.secondary.main
    }
}));

export const feedbacksCohort = makeStyles(theme => ({

}));

export const allFeedbacksResumeStyles = makeStyles(theme => ({

}));

export const AllFeedbacksCohortStyles = makeStyles(theme => ({

}));
