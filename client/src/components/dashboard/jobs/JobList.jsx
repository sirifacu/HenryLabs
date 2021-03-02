import { Button, CardActionArea, Divider, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Link as RouterLink } from 'react-router-dom';
import { getJobs } from '../../../redux/jobsReducer/actionsJobs';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    margin: theme.spacing(1)
  },
  card:{
    display: 'flex',
    flexDirection: 'row',
  },
  type:{
    display: 'flex',
    flexDirection: 'row',
    marginLeft: theme.spacing(3),
    alignItems: "center"
  },
  button:{
    width: "5%",
    marginLeft: theme.spacing(2),
  }
}));


const JobList = (jobs) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const jobState = useSelector((state) => state.jobReducer.jobs);
  
  useEffect(() => {
    dispatch(getJobs());
    // eslint-disable-next-line
  }, []);
  
  console.log(jobState);
     return (
      <>
         {jobState && jobState.map((job) =>{return (
           <CardActionArea key={job.id}>           
           <Grid  container  className={classes.root}  > 
           <Grid  item xs={12} className={classes.card}>
            <Typography gutterBottom variant="h5" >
               {job.title}
              </Typography>           
           </Grid>
           <Grid item xs={12} className={classes.card}>
           <Typography variant="body2" >
             {job.webProfile }
           </Typography>
           <Typography className={classes.type} variant="body2" >
             {job.contract }
           </Typography>
           <Typography className={classes.type} variant= 'body2'>
              {job.type}
              </Typography>
              </Grid>
              </Grid>
              
            <Grid  item xs={12} className={classes.card}>          
           </Grid>
           <Divider variant="fullWidth"/>
           </CardActionArea>
           )
          })}
       </>
     );

}

export default JobList;
