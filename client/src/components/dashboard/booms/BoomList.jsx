import { CardActionArea, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getBooms } from "../../../redux/boomsReducer/actionsBooms";
import { useStylesBoomList } from "./styles";

const BoomList = () => {
  const dispatch = useDispatch();
  const classes = useStylesBoomList();
  const history = useHistory();
  const boomState = useSelector((state) => state.boomReducer.booms);
  useEffect(() => {
    dispatch(getBooms());
  }, []);

  return (
    <>
      {boomState &&
        boomState.map((boom) => {
          return (
            <CardActionArea
              key={boom._id}
              onClick={() => history.push(`/panel/lista-booms/${boom._id}`)}
            >
              <Grid container className={classes.root}>
                <Grid xs={8} item container>
                  <Grid item container>
                    <Grid item>
                      <Typography gutterBottom variant="h5">
                      💥Boom💥 {boom.student}
                      </Typography>
                    </Grid>
                    <Grid item container>
                      <Grid xs={4} item>
                        <Typography variant="body2">
                          Contratado como: {boom.position} ¿Qué estudiabas
                          antes? : {boom.previousStudies}
                        </Typography>
                      </Grid>
                      <Grid xs={4} item container >
                        <Grid item>
                          <Typography className={classes.type} variant="body2">
                            Para {boom.company} En {boom.country}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid xs={4} item container >
                        <Grid item>
                          <Typography className={classes.type} variant="body2">
                            Mejoró Ingresos en: {boom.incomeImprovement} Qué
                            Hacía antes de Henry:
                            {boom.whatYouDidBefore}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid xs={4} item container justify="flex-end">
                        <Grid item>
                          <Typography className={classes.type} variant="body2">
                            Agradecimientos: {boom.thanks} Comentarios:{" "}
                            {boom.comments}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardActionArea>
          );
        })}
    </>
  );
};

export default BoomList;
