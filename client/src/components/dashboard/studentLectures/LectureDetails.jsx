import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Link } from '@material-ui/core';
import useStyles from './styles';
import ReactMarkdown from 'react-markdown';
import axios from 'axios'

const LectureDetails = ({lecture}) => {
    const classes = useStyles();
    const { title, description, videoURL, githubURL } = lecture
    const [component, setComponent] = useState('')

    const readmeRender = () => {
        if(description && description.slice(0,4) === 'http'){
            fetch(description)
            .then(res => res.text())
            .then(res => setComponent(<ReactMarkdown className={classes.description}>{res}</ReactMarkdown>))
        } else {
            setComponent(<Typography variant="h5" className={classes.description}> {description} </Typography>)
        }
    }

    useEffect(readmeRender, [lecture])

    return (
        <Paper elevation={4} className={classes.marginT}>
            <Grid item container direction="column" spacing={3}>
                {/* Title row */}
                <Grid item container direction="row" justify="center">
                    <Grid item>
                        <Typography variant="h2"> {title} </Typography>
                    </Grid>
                </Grid>
                <hr></hr>
                {/* Github link row */}
                <Grid item container direction="row" alignItems="center" justify="center">
                    {githubURL && <Grid item container xs={6} direction="column" justify="center" alignItems="center">
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
                    <Grid item container xs={6} direction="column" justify="center" alignItems="center">
                        <Grid item>
                            <Typography variant="h4"> Video de la clase </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="h5"> 
                                <Link href={videoURL}
                                        rel="noreferrer" 
                                        target="_blank" 
                                        color="secondary" 
                                        onClick={(e) => e.preventDefault}
                                        component="a"
                                    > 
                                    {videoURL}
                                </Link>
                             </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <hr></hr>
                {/* Description row */}
                {/* <Grid item container direction="row" justify="center">
                    <Grid item>
                        
                    </Grid>
                </Grid> */}
                <Grid item container direction="row" justify="center">
                    <Grid item>
                        {component}
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    )
};

export default LectureDetails;