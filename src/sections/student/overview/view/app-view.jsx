import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import route from 'src/routes';
import { getStudentDashboardData } from 'src/api/dashboardSlice';

import { Loader } from 'src/sections/loader';
import AppWidgetSummary from 'src/sections/superAdmin/overview/app-widget-summary';
// ----------------------------------------------------------------------

export default function AppView() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, data } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(getStudentDashboardData());
  }, [dispatch]);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        {t('greeting')}
      </Typography>
      {loading ? (
        <Loader />
      ) : (
        <Grid container spacing={3} padding={10}>
          <Grid xs={12} sm={6}>
            <AppWidgetSummary
              title={t('subjects')}
              total={data?.numberOfSubjects || 0}
              color="warning"
              icon={<img alt="icon" src="/assets/icons/glass/students.png" />}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: '0.4s',
                ...{ '&:hover': { background: '#eee' } },
              }}
              onClick={() => navigate(route.student.subjects)}
            />
          </Grid>

          <Grid xs={12} sm={6}>
            <AppWidgetSummary
              title={t('lecturesToday')}
              total={data?.todaysLectures || 0}
              color="info"
              icon={<img alt="icon" src="/assets/icons/glass/departments2.png" />}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: '0.4s',
                ...{ '&:hover': { background: '#eee' } },
              }}
              onClick={() => navigate(route.student.schedule)}
            />
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
