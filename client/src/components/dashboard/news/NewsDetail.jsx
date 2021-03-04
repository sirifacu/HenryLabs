import { Divider } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import LanguageIcon from '@material-ui/icons/Language';
import axios from 'axios';
import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: 'none',
  }, 
}));


const NewsDetail = () => {
  const classes = useStyles();
  const [notice, setNotice] = useState([]);
  const { id } = useParams();
  
  useEffect(() => {
    axios.get(`news/list/${id}`)
    .then((res) => {
      setNotice(res.data);
    })
    // eslint-disable-next-line
  }, []);
  
     return (
      <Card className={classes.root}>
        <CardContent>
          <Typography gutterBottom variant="h4" component="h2">
            {notice.title}
          </Typography>
          <Typography variant='h5' color="textPrimary">
            {notice.type}
          </Typography>
          <br></br>
          <Button variant='text' href={`https://${notice.link}/`} target="_blank" ><LanguageIcon/> {notice.link} </Button>
          <br></br>
          <Divider></Divider>
          <br></br>
          <Typography variant="body2" color="textSecondary" component="p">
            {notice.description}
          </Typography>
        </CardContent>
    </Card>
       );
       
      }
      
export default NewsDetail;
