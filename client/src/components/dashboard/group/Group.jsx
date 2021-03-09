import React from 'react';
import { Grid } from '@material-ui/core';
import CreateGroupForm from './group/CreateGroupForm'
import ListGroup from '../group/groupTable/ListGroup'

const Group = () => {

  return (
    <>
      <Grid container direction='row' spacing={5} justify='center'>
        <Grid container item xs={6} justify='center'>
          <CreateGroupForm/>
        </Grid>
        <Grid container item xs={12}>
          <ListGroup/>
        </Grid>
      </Grid>
    </>
  );
};

export default Group;