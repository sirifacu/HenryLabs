import { Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';


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


const JobDetail = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [job, setJob] = useState([]);
  const { id } = useParams();
  const jobState = useSelector((state) => state.jobReducer.jobs);


  useEffect(() => {
    axios.get(`/jobs/list/${id}`)
    .then((res) => {
      setJob(res.data);
    })
    // eslint-disable-next-line
  }, []);

  

     return (
      <>
      <div>{job.title}</div>
      <div>{job.type}</div>
      <div>{job.contract}</div>
      <div>{job.requirements}</div>
      <div>{job.salary}</div>
      <div>{job.description}</div>
      <div>{job.benefits}</div>
      
      <Paper elevation={3}>           
        <Grid  container  className={classes.root}  > 
        <Grid  item xs={12} className={classes.card}>
        <Typography gutterBottom variant="h5" >
            {jobState.title}
          </Typography>           
        </Grid>
        <Grid item xs={12} className={classes.card}>
        <Typography variant="body2" >
          {jobState.webProfile }
        </Typography>
        <Typography className={classes.type} variant="body2" >
          {jobState.contract }
        </Typography>
        <Typography className={classes.type} variant= 'body2'>
          {jobState.type}
          </Typography>
          </Grid>
          </Grid>
          
        <Grid  item xs={12} className={classes.card}>          
        </Grid>
       </Paper> 
           
      
           
       </>
       
     );

}

export default JobDetail;
