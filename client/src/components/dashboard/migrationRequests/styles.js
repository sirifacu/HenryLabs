import {makeStyles} from '@material-ui/core';

export const useRowStyles = makeStyles(theme => ({
      root: {
        '& > *': {
          borderBottom: 'unset',
        }
      },
      rootSelected: {
        '& > *': {
          borderBottom: 'unset',
          backgroundColor: theme.palette.grey[300]
        }
      },
      primary: {
        color: theme.palette.primary.main
      },
      paper:{
        margin: "4%",
      },
      closeButton: {
        backgroundColor: theme.palette.warning.main
      },
      acceptButton: {
        backgroundColor: theme.palette.success.main
      },
      RejectButton: {
        backgroundColor: theme.palette.error.main
      }
    })
  );