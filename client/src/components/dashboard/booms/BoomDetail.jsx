import { Button, Divider } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStylesBoomDetail } from "./styles";
import { useHistory } from 'react-router-dom';
import { useSelector } from "react-redux";

const BoomDetail = () => {
  const classes = useStylesBoomDetail();
  const [boom, setBoom] = useState([]);
  const history = useHistory();
  const { id } = useParams();
  const token = localStorage.getItem('data');
  const userLoggedIn = useSelector(store => store.userLoggedIn.userInfo)
  const isStudentOrInstructor = userLoggedIn.roles.find(role => role.name === 'student' || role.name === 'instructor')

  useEffect(() => {
    axios.get(`/booms/list/${id}`, { headers: {Authorization: 'Bearer ' + token }})
    .then((res) => {
      setBoom(res.data);
    });
    console.log("Hola");
    // eslint-disable-next-line
  },[]);
  
  const handleAccepted = () => {
    axios.put(`/booms/changeStatus/${id}`, {status: 'Aceptado', createdAt: new Date()}, { headers: {Authorization: 'Bearer ' + token }})
    .then(() => {
      axios.get(`/users/listAll`, { headers: {Authorization: 'Bearer ' + token }})
      .then(res => {
        const tokens = res.data.map(item => item.registrationToken)
        axios.post('/notifications/sendToMany', {
          title: "💥 NUEVO BOOM 💥",
          body: `Henry sigue sumando booms!`,
          registrationTokens: tokens.filter(item => !!item)
      },
      { headers: {Authorization: 'Bearer ' + token }})
      })
    })
    .then( () => {
      history.push('/panel/lista-booms')
    })
    .catch( error => {
      console.log(error)
    })
  }

  const handleRejected = () => {
    axios.put(`/booms/changeStatus/${id}`, {status:'Rechazado', createdAt: new Date()}, { headers: {Authorization: 'Bearer ' + token }})
    .then( reponse => {
      history.push('/panel/lista-booms')
    })
    .catch( error => {
      console.log(error)
    })
  }
  const handleDelete = () => {
    axios.delete(`/booms/list/${id}`, { headers: {Authorization: 'Bearer ' + token }})
    .then((data) => {
      history.push('/panel/lista-booms')
    })
    .catch((err) => console.log(err));
  }

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography gutterBottom variant="h4" component="h2">
        💥Boom💥 {boom.student}
        </Typography>
        <Typography variant="h5" color="textPrimary">
          Contratado como: {boom.position}
        </Typography>
        <Typography variant="h5" color="textPrimary">
          Para: {boom.company}
        </Typography>
        <Divider></Divider>
        <Typography variant="h6" color="textSecondary" component="p">
          País: {boom.country}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          ¿Qué estudiabas antes de Henry? {boom.previousStudies}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          ¿En cuánto mejoraste tus ingresos? {boom.incomeImprovement}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          ¿Qué hacías antes de Henry? {boom.whatYouDidBefore}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Agradecimientos: {boom.thanks}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Comentarios: {boom.comments}
        </Typography>
        <Divider></Divider>
      </CardContent>
      {!isStudentOrInstructor && <CardActions>
       {boom.status === 'Pendiente' && <Button onClick={handleAccepted}>Aceptar</Button>}
       {boom.status === 'Pendiente' && <Button onClick={handleRejected}>Rechazar</Button>}
        <Button onClick={handleDelete}>Eliminar</Button>
      </CardActions>}
    </Card>
  );
};

export default BoomDetail;
