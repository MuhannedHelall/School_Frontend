import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { getStudentDashboardData } from 'src/api/dashboardSlice';

import { Loader } from 'src/sections/loader';
import AppWidgetSummary from 'src/sections/superAdmin/overview/app-widget-summary';
// ----------------------------------------------------------------------

export default function AppView() {
  //   const data = {};
  const dispatch = useDispatch();
  const { loading, data } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(getStudentDashboardData());
  }, [dispatch]);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>
      {loading ? (
        <Loader />
      ) : (
        <Grid container spacing={3} padding={10}>
          <Grid xs={12} sm={6}>
            <AppWidgetSummary
              title="Lectures Today"
              total={data?.todaysLectures || 0}
              color="info"
              icon={<img alt="icon" src="/assets/icons/glass/departments2.png" />}
              sx={{ display: 'flex', justifyContent: 'center' }}
            />
          </Grid>

          <Grid xs={12} sm={6}>
            <AppWidgetSummary
              title="Subjects"
              total={data?.numberOfSubjects || 0}
              color="warning"
              icon={<img alt="icon" src="/assets/icons/glass/students.png" />}
              sx={{ display: 'flex', justifyContent: 'center' }}
            />
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
