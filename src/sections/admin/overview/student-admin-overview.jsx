import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@mui/material/Unstable_Grid2';

import AppWidgetSummary from 'src/sections/superAdmin/overview/app-widget-summary';

export default function StudentAdminOverview({ data }) {
  return (
    <Grid container spacing={3} padding={10}>
      <Grid xs={12} sm={6}>
        <AppWidgetSummary
          title="Students"
          total={data.numOfStudents}
          color="success"
          icon={<img alt="icon" src="/assets/icons/glass/students.png" />}
          sx={{ display: 'flex', justifyContent: 'center' }}
        />
      </Grid>

      <Grid xs={12} sm={6}>
        <AppWidgetSummary
          title="Classes"
          total={data.numOfClassRooms}
          color="error"
          icon={<img alt="icon" src="/assets/icons/glass/departments.png" />}
          sx={{ display: 'flex', justifyContent: 'center' }}
        />
      </Grid>
    </Grid>
  );
}

StudentAdminOverview.propTypes = {
  data: PropTypes.any,
};
