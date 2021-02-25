import CreateCohortForm from './CreateCohortForm'
import  ShowCohorts  from './ShowCohorts';
import CohortDetail from './CohortDetail';
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';

const Cohort = () => {

  return (
    <>
      <CreateCohortForm />
      <ShowCohorts />
    </>
  );
};

export default Cohort;