import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import CreateGroupForm from '../groups/CreateGroupForm'

const Group = () => {

  return (
    <>
      <Grid container direction='row' spacing={5} justify='center'>
        <Typography>Grupos</Typography>
        <CreateGroupForm />
      </Grid>


    </>
  );
};

export default Group; 