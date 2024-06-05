import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Grid from '@mui/material/Unstable_Grid2';

import route from 'src/routes';

import AppWidgetSummary from 'src/sections/superAdmin/overview/app-widget-summary';

export default function EmployeeAdminOverview({ data }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <Grid container spacing={3} padding={10}>
      <Grid xs={12}>
        <AppWidgetSummary
          title={t('employees')}
          total={data.numOfEmployees}
          color="info"
          icon={<img alt="icon" src="/assets/icons/glass/employee.png" />}
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
    </Grid>
  );
}

EmployeeAdminOverview.propTypes = {
  data: PropTypes.any,
};
