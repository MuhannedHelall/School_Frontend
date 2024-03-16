import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@mui/material/Unstable_Grid2';

import AppWidgetSummary from 'src/sections/superAdmin/overview/app-widget-summary';

export default function TeacherAdminOverview({ data }) {
  return (
    <Grid container spacing={3} padding={10}>
      <Grid xs={12} sm={6}>
        <AppWidgetSummary
          title="Teachers"
          total={data.numOfTeachers}
          color="success"
          icon={<img alt="icon" src="/assets/icons/glass/admins.png" />}
          sx={{ display: 'flex', justifyContent: 'center' }}
        />
      </Grid>

      <Grid xs={12} sm={6}>
        <AppWidgetSummary
          title="Subjects"
          total={data.numOfSubjects}
          color="error"
          icon={<img alt="icon" src="/assets/icons/glass/departments.png" />}
          sx={{ display: 'flex', justifyContent: 'center' }}
        />
      </Grid>
    </Grid>
  );
}

TeacherAdminOverview.propTypes = {
  data: PropTypes.any,
};
