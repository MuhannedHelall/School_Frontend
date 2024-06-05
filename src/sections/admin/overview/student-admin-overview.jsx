import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Grid from '@mui/material/Unstable_Grid2';

import route from 'src/routes';

import AppWidgetSummary from 'src/sections/superAdmin/overview/app-widget-summary';

export default function StudentAdminOverview({ data }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  return (
    <Grid container spacing={3} padding={10}>
      <Grid xs={12} sm={6}>
        <AppWidgetSummary
          title={t('classes')}
          total={data.numOfClassRooms}
          color="error"
          icon={<img alt="icon" src="/assets/icons/glass/departments.png" />}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: '0.4s',
            ...{ '&:hover': { background: '#eee' } },
          }}
          onClick={() => navigate(route.admin.classes)}
        />
      </Grid>

      <Grid xs={12} sm={6}>
        <AppWidgetSummary
          title={t('students')}
          total={data.numOfStudents}
          color="success"
          icon={<img alt="icon" src="/assets/icons/glass/students.png" />}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: '0.4s',
            ...{ '&:hover': { background: '#eee' } },
          }}
          onClick={() => navigate(route.admin.students)}
        />
      </Grid>
    </Grid>
  );
}

StudentAdminOverview.propTypes = {
  data: PropTypes.any,
};
