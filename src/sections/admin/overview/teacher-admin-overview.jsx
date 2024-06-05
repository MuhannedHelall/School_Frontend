import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Grid from '@mui/material/Unstable_Grid2';

import route from 'src/routes';

import AppWidgetSummary from 'src/sections/superAdmin/overview/app-widget-summary';

export default function TeacherAdminOverview({ data }) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Grid container spacing={3} padding={10}>
      <Grid xs={12} sm={6}>
        <AppWidgetSummary
          title={t('teachers')}
          total={data.numOfTeachers}
          color="success"
          icon={<img alt="icon" src="/assets/icons/glass/admins.png" />}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: '0.4s',
            ...{ '&:hover': { background: '#eee' } },
          }}
          onClick={() => navigate(route.admin.emps)}
        />
      </Grid>

      <Grid xs={12} sm={6}>
        <AppWidgetSummary
          title={t('subjects')}
          total={data.numOfSubjects}
          color="error"
          icon={<img alt="icon" src="/assets/icons/glass/departments.png" />}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: '0.4s',
            ...{ '&:hover': { background: '#eee' } },
          }}
          onClick={() => navigate(route.admin.subjects)}
        />
      </Grid>
    </Grid>
  );
}

TeacherAdminOverview.propTypes = {
  data: PropTypes.any,
};
