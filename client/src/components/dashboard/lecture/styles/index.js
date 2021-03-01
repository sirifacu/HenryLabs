import { fade, lighten, makeStyles } from '@material-ui/core';

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

export const editLecturesStyles = makeStyles((theme) => ({
    card: {
     maxWidth: "90%",
     margin: "auto",
     marginTop: "1rem",
     padding: "1%"
   },
   margin: {
     margin: theme.spacing(1),
   },
   inputs: {
       height: "50",
   },
   extendedIcon: {
    marginRight: theme.spacing(1),
  },
 }));

 export const addLecturesStyles = makeStyles((theme) => ({
    card: {
     maxWidth: "90%",
     margin: "auto",
     marginTop: "1rem",
     padding: "1%"
   },
   margin: {
     margin: theme.spacing(1),
   },
   inputs: {
       height: "50",
   }
 }));

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

export const enhancedTableToolbarStyles = makeStyles((theme) => ({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      marginTop: theme.spacing(2),
      flex: '1 1 100%',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    search: {
      marginTop: theme.spacing(2),
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.grey[700], 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.grey[700], 0.45),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));