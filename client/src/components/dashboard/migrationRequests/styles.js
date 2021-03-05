import {makeStyles} from '@material-ui/core';

export const useRowStyles = makeStyles(theme => ({
      root: {
        '& > *': {
          borderBottom: 'unset',
        }
      },
      primary: {
        color: theme.palette.primary.main
      }
    })
  );