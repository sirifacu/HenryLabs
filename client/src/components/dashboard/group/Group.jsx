import React from 'react';
import { Grid } from '@material-ui/core';
import CreateGroupForm from './CreateGroupForm'
import ListGroup from './groupTable/ListGroup'

const Group = () => {

  return (
    <>
      <Grid container direction='row' spacing={5} justify='center'>
        <Grid container item xs={12}>
          <ListGroup/>
        </Grid>
      </Grid>
    </>
  );
};

export default Group;