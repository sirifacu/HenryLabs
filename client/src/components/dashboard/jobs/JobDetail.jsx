import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';


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
      console.log(res.data)
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
        <Button size="small" color="primary">
          Aplicar
        </Button>
        <Button size="small" color="primary">
          Compartir
        </Button>
      </CardActions>
    </Card>
       );
       
      }
      
      export default JobDetail;
      
      // <>
     
      // <div>hola</div>
      // <div>{job.title}</div>
      // <div>{job.type}</div>
      // <div>{job.contract}</div>
      // <div>{job.requirements}</div>
      // <div>{job.salary}</div>
      // <div>{job.description}</div>
      // <div>{job.benefits}</div>
                 
      //   <Grid  container  className={classes.root}  > 
      //   <Grid  item xs={12} className={classes.card}>
      //   <Typography gutterBottom variant="h5" >
      //       {job.title}
      //     </Typography>           
      //   </Grid>
      //   <Grid item xs={12} className={classes.card}>
      //   <Typography variant="body2" >
      //     {job.webProfile }
      //   </Typography>
      //   <Typography className={classes.type} variant="body2" >
      //     {job.contract }
      //   </Typography>
      //   <Typography className={classes.type} variant= 'body2'>
      //     {job.type}
      //     </Typography>
      //     </Grid>
      //     </Grid>
          
      //   <Grid  item xs={12} className={classes.card}>          
      //   </Grid>
          
      
           
      //  </>