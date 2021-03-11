import React from 'react';
import useStyles from './styles';
import { Grid, Typography } from '@material-ui/core'
import FolderIcon from '@material-ui/icons/Folder';

const LectureFolders = ({lecture}) => {
    const classes = useStyles();
    const { title } = lecture
    return (
        <Grid item container direction="column" justify="center" className={classes.marginX}>
            <Grid item>
                <FolderIcon className={classes.iconSize} color="action" />
            </Grid>
            <Grid item>
                <Typography variant="h6" className={classes.marginL}>{title}</Typography>
            </Grid>
        </Grid>
    )
}

export default LectureFolders;
