import React, { useState, useEffect } from 'react';
import AddFeedback from '../feedback/AddFeedback';
import { Grid, Paper, Typography, Link } from '@material-ui/core';
import useStyles from './styles';
import ReactPlayer from 'react-player'

const LectureDetails = ({lecture}) => {
    const classes = useStyles();
    const { id, title, videoURL, githubURL } = lecture

    return (
        <Paper elevation={4} className={classes.marginT}>
            <Grid item container direction="column" spacing={3}>
                {/* Feedback button row */}
                <Grid item container alignItems="center" justify="flex-end"  >
                    <Grid item style={{marginRight: "3%"}}>
                        <AddFeedback lectureId={id} />
                    </Grid>
                </Grid>
                {/* Title row */}
                <Grid item container direction="row" alignItems="center" justify="center"  >
                    <Grid item container justify="center" xs={12}>
                        <Grid item>
                            <Typography variant="h2"> {title} </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                </Grid>
                <hr></hr>
                {/* Description row */}
                {
                    videoURL && videoURL.includes('http') ? 
                    <Grid item container direction="row" justify="center">
                        <Grid item>
                            <ReactPlayer url={videoURL} controls={true} widht={'800px'} height={"450px"} />
                        </Grid>
                    </Grid>
                    : <Typography variant="h5"> Esta clase no tiene un video asociado. </Typography>
                }
                {/* Github link row */}
                <Grid item container direction="row" alignItems="center" justify="center" spacing={2}>
                    {githubURL && 
                    <Grid item container xs={12} direction="column" justify="center" alignItems="center">
                        <Grid item>
                            <Typography variant="h4"> Link al repositorio </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="h5"> 
                                <Link href={githubURL}
                                    rel="noreferrer" 
                                    target="_blank" 
                                    color="secondary" 
                                    onClick={(e) => e.preventDefault}
                                    component="a"
                                >
                                {githubURL} 
                                </Link> 
                            </Typography>
                        </Grid>
                    </Grid>}
                </Grid>
        </Paper>
    )
};

export default LectureDetails;