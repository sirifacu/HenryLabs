import { Box, Button, Grid, Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import axios from "axios";
import React, { useEffect, useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { FacebookIcon, FacebookShareButton, LinkedinIcon, LinkedinShareButton, TwitterIcon, TwitterShareButton } from "react-share";
import { deleteNews } from "../../../redux/newsReducer/newsAction";
import noImage from "../../../assets/noImage.png";
import Swal from 'sweetalert2'
import { useStylesNewsDetails } from './styles'


const NewsDetail = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStylesNewsDetails();
  const [notice, setNotice] = useState([]);
  const user = useSelector(store => store.userLoggedIn.userInfo) || "";
  const token = useSelector(store => store.userLoggedIn.token)
  const { id } = useParams();
  const userLoggedIn = useSelector(store => store.userLoggedIn.userInfo)
  const isStudentOrInstructor = userLoggedIn.roles.find(role => role.name === 'student' || role.name === 'instructor')

  useEffect(() => {
    axios.get(`/news/list/${id}`,
      { headers: {'Authorization': 'Bearer ' + token }})
    .then((res) => {
      setNotice(res.data);
    })
    // eslint-disable-next-line
  }, []);

  const handleRemove = (id) => {
    Swal.fire({
      title: "Detente",
      text: "¿Estas seguro de querer borrar esta noticia?",
      icon: 'warning',
      showDenyButton: true,
      confirmButtonColor: '#ffeb3b',
      denyButtonColor: "#424242",
      confirmButtonText: "Si, eliminala",
      denyButtonText: "No, cancelar"
    }).then(result => {
      if(result.isConfirmed){
        dispatch(deleteNews(id))
        history.push('/panel/noticias')
      }
    })
  };

  const shareUrl = 'https://www.soyhenry.com/';
  const title = 'Proyecto E-Commerce | Clotheny Shop ';

  let roles = [];
	user.roles && user.roles.forEach(role => {
		return roles.push(role.name)
	})
  
     return (
      <>
      <Box className={classes.root}>
      <Paper elevation={9} style={{padding: "2%"}}>
          <Grid container justify="center">
            <Grid item container xs={12} md={12} justify="center">
                <Grid item xs={8}>
                   <img src={notice.image || noImage}  className={classes.image}/>
                </Grid>
                <Grid item container justify="space-between" alignItems="center">
                  <Grid item>
                    <Typography
                      className={classes.fonts}
                      variant="h5"
                    >
                      {notice.title} | {notice.type}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button className={classes.button} variant='text' href={`${notice.link}`} target="_blank" >
                      Ir a la noticia
                    </Button>
                  </Grid>
                </Grid>
                <Grid item xs={12} style={{padding: "3%", textAlign:"justify"}}>
                  <Typography variant="body1" paragraph={true} noWrap={false}>
                    {notice.description}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item container justify="center">
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
                </Grid>
                <Grid item container justify="center">
                  {roles.includes('staff') ? (
                  <Grid className={classes.button}>
                  <Typography>Borrar Noticia</Typography>
                    <DeleteForeverIcon
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleRemove(notice._id)}/>
                  </Grid>
                  ) : null}
            </Grid>
          </Grid>
          
          </Paper>
      </Box>
    </>
       );
       
      }
      
export default NewsDetail;

