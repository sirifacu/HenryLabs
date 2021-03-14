import { Divider } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStylesBoomDetail } from "./styles";

const BoomDetail = () => {
  const classes = useStylesBoomDetail();
  const [boom, setBoom] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`booms/list/${id}`).then((res) => {
      setBoom(res.data);
    });
    // eslint-disable-next-line
  }, []);

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
      <CardActions></CardActions>
    </Card>
  );
};

export default BoomDetail;
