import { Box, Button, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import axios from "axios";
import React, { useEffect, useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { FacebookIcon, FacebookShareButton, LinkedinIcon, LinkedinShareButton, TwitterIcon, TwitterShareButton } from "react-share";
import { deleteNews } from "../../../redux/newsReducer/newsAction";


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    boxShadow: 'none',
    padding: theme.spacing(2),
  },
  media: {
    padding: theme.spacing(2),
    MaxHeight: 300,
    maxWidth: 300,
  },
  info: {
    padding: theme.spacing(5),
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(1),
  },
  text: {
    display: 'flex',
    justifyContent: 'center',
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000', 
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  fonts: {
    padding: theme.spacing(2),
  }
}));

const NewsDetail = () => {
  const dispatch = useDispatch();
  const history = useHistory();
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

  const handleRemove = (id) => {
    dispatch(deleteNews(id))
    history.push('/panel/noticias')
  };

  const shareUrl = 'https://www.soyhenry.com/';
  const title = 'Proyecto E-Commerce | Clotheny Shop ';

  
     return (
      <>
      <Box className={classes.root}>
      <Paper elevation={9}>
      <Grid container direction="row" justify="center">
      
            <Grid item container xs={12} md={12} justify="center">
              <Grid item className={classes.info}>
                <Typography
                  className={classes.fonts}
                  variant="h5"
                >
                  {notice.title} | {notice.type}
                </Typography>
                
                <Button className={classes.button} variant='text' href={`https://${notice.link}/`} target="_blank" >
                {notice.link}
                </Button>

                <div  >
                { ReactHtmlParser(notice.description) }
                </div>
                
                <Grid item className={classes.button}>
                  <FacebookShareButton
                    url={shareUrl}
                    quote={title}
                    className="Demo__some-network__share-button"
                  >
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>
                  <TwitterShareButton
                    url={shareUrl}
                    title={title}
                    className="Demo__some-network__share-button"
                  >
                    <TwitterIcon size={32} round />
                  </TwitterShareButton>
                  <LinkedinShareButton
                    url={shareUrl}
                    className="Demo__some-network__share-button"
                  >
                    <LinkedinIcon size={32} round />
                  </LinkedinShareButton>
                  </Grid>
                  <Grid className={classes.button}>
                  <Typography>Borrar Noticia</Typography>
                    <DeleteForeverIcon 
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleRemove(notice._id)}/>
                  </Grid>
              </Grid>
            </Grid>
          </Grid>
          
          </Paper>
      </Box>
    </>
       );
       
      }
      
export default NewsDetail;

