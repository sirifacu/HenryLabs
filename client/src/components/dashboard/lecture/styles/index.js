import { makeStyles } from '@material-ui/core';


export const listLecturesStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    lectureDetail: {
        backgroundColor: 'white',
        maxWidth: '50%',
        margin: 'auto'
    },
}));

export const lectureDetailStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        padding: '0'
    },
    head: {
        display: 'flex',
        backgroundColor: 'black',
        alignItems: 'center',
    },
    title: {
        minWidth: '40rem',
        minHeight: '5rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleTypography: {
        fontSize: '3rem'
    },
    feedbackResume: {
        width: 'fit-content'
    },
    details: {
        display: 'flex',
        justifyContent: 'space-around',
        margin: '5% 0'
    },
    description: {
        padding: '0 8.5%'
    },
    link: {
        cursor: 'pointer',
        textDecoration: 'none',
        color: theme.palette.primary.main
    },
}));
