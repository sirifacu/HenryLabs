import { Button, fade, lighten, makeStyles } from '@material-ui/core';

 export const listCohortStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
      backgroundColor: theme.palette.grey[400]
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
    Pagination:{
      backgroundColor: theme.palette.grey[500]
    }
}));

export const enhancedTableToolbarStyles = makeStyles((theme) => ({
  toolbarTable:{
    backgroundColor: theme.palette.grey[500]
  },
  title: {
      marginTop: theme.spacing(2),
      flex: '1 1 100%',
      color: 'black'
    },
  }));

export const cohortDetailStyles = makeStyles((theme) => ({
  button: {
    width: theme.spacing(15)
  },
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  title: {
    flex: '1 1 100%',
  },
}))