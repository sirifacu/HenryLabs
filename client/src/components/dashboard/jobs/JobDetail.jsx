import { Divider, Button, Card, CardActions, CardContent, makeStyles, Typography, } from '@material-ui/core';
import axios from 'axios';
import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LanguageIcon from '@material-ui/icons/Language';

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: 'none',
  }, 
}));

const JobDetail = () => {
  const classes = useStyles();
  const [job, setJob] = useState([]);
  const { id } = useParams();
  
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
          <Typography gutterBottom variant="h4" component="h2">
            {job.title}
          </Typography>
          <Typography variant='h5' color="textPrimary">
            {job.type} | {job.contract} | {job.seniority}
          </Typography>
          <br></br>
          <Button variant='text' href={`https://${job.webProfile}/`} target="_blank" ><LanguageIcon/> {job.webProfile} </Button>
          <br></br>
          <Divider></Divider>
          <br></br>
          <Typography variant="h6" color="textSecondary" component="p">
            Descripción del cargo:
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {job.description}
          </Typography>
          <br></br>
          <Typography variant="h6" color="textSecondary" component="p">
            Beneficios:
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {job.benefits}
          </Typography>
          <br></br>
          <Typography variant="h6" color="textSecondary" component="p">
            Requisitos Tecnicos:
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {job.requirements}
          </Typography>
          <br></br>
          <Typography variant="h6" color="textSecondary" component="p">
            Idiomas:
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {job.language}
          </Typography>
          <br></br>
          <Typography variant="h6" color="textSecondary" component="p">
            Otros:
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {job.others}
          </Typography>
          <br></br>
          <Divider></Divider>
          <br></br>
          <Typography variant="h5" color="textSecondary" component="p">
            Salario: ${job.salary}
          </Typography>
        </CardContent>
      <CardActions>
          
      </CardActions>
    </Card>
       );
       
      }
      
export default JobDetail;
