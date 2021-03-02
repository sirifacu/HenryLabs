import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: 'none',
  },
 
}));


const JobDetail = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [job, setJob] = useState([]);
  const { id } = useParams();
  const jobState = useSelector((state) => state.jobReducer.jobs);


  useEffect(() => {
    axios.get(`jobs/list/${id}`)
    .then((res) => {
      setJob(res.data);
    })
    // eslint-disable-next-line
  }, []);
  

     return (
      <Card className={classes.root}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {job.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {job.type} | {job.contract}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {job.description}
          </Typography>
          <br></br>
          <Typography variant="body2" color="textSecondary" component="p">
            Beneficios: {job.benefits}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Requisitos: {job.requirements}
          </Typography>
          <br></br>
          <Typography variant="body2" color="textSecondary" component="p">
            Salario: ${job.salary}
          </Typography>
        </CardContent>
      <CardActions>
          
      </CardActions>
    </Card>
       );
       
      }
      
export default JobDetail;
