import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import CreateGroupForm from '../groups/CreateGroupForm'
import ListGroups from '../groups/ListGroup'

const Group = () => {

  return (
    <>
      <Grid container direction='row' spacing={5} justify='center'>
        
        <CreateGroupForm />
        <ListGroups />
      </Grid>


    </>
  );
};

export default Group; 