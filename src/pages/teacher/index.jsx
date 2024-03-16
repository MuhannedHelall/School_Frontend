import { Helmet } from 'react-helmet-async';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import AppWidgetSummary from 'src/sections/superAdmin/overview/app-widget-summary';

function TeacherIndex() {
  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back 👋
        </Typography>

        <Grid container spacing={3} padding={10}>
          <Grid xs={12} sm={6}>
            <AppWidgetSummary
              title="Admins"
              total={10002}
              color="success"
              icon={<img alt="icon" src="/assets/icons/glass/admins.png" />}
              sx={{ display: 'flex', justifyContent: 'center' }}
            />
          </Grid>

          <Grid xs={12} sm={6}>
            <AppWidgetSummary
              title="Employees"
              total={10002}
              color="info"
              icon={<img alt="icon" src="/assets/icons/glass/employee.png" />}
              sx={{ display: 'flex', justifyContent: 'center' }}
            />
          </Grid>

          <Grid xs={12} sm={6}>
            <AppWidgetSummary
              title="Students"
              total={10002}
              color="warning"
              icon={<img alt="icon" src="/assets/icons/glass/students.png" />}
              sx={{ display: 'flex', justifyContent: 'center' }}
            />
          </Grid>

          <Grid xs={12} sm={6}>
            <AppWidgetSummary
              title="Departments"
              total={10002}
              color="error"
              icon={<img alt="icon" src="/assets/icons/glass/departments.png" />}
              sx={{ display: 'flex', justifyContent: 'center' }}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default TeacherIndex;
