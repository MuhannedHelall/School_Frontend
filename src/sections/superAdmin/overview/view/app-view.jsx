import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { getSuperDashboardData } from 'src/api/dashboardSlice';

import { Loader } from 'src/sections/loader';

import AppWidgetSummary from '../app-widget-summary';
// ----------------------------------------------------------------------

export default function AppView() {
  const dispatch = useDispatch();
  const { data, error, loading } = useSelector((state) => state.dashboard);

  useEffect(() => {
    if (Object.keys(data).length < 1) dispatch(getSuperDashboardData());
  }, [dispatch, data]);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>

      {error &&
        toast.error(error, {
          toastId: error,
          position: 'bottom-right',
          autoClose: 20000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        })}

      {loading ? (
        // <h1 style={{ textAlign: 'center', marginTop: '30vh' }}>Loading ...</h1>
        <Loader />
      ) : (
        <Grid container spacing={3} padding={10}>
          <Grid xs={12} sm={6}>
            <AppWidgetSummary
              title="Admins"
              total={data.numOfAdmins}
              color="success"
              icon={<img alt="icon" src="/assets/icons/glass/admins.png" />}
              sx={{ display: 'flex', justifyContent: 'center' }}
            />
          </Grid>

          <Grid xs={12} sm={6}>
            <AppWidgetSummary
              title="Employees"
              total={data.numOfEmployees}
              color="info"
              icon={<img alt="icon" src="/assets/icons/glass/employee.png" />}
              sx={{ display: 'flex', justifyContent: 'center' }}
            />
          </Grid>

          <Grid xs={12} sm={6}>
            <AppWidgetSummary
              title="Students"
              total={data.numOfStudents}
              color="warning"
              icon={<img alt="icon" src="/assets/icons/glass/students.png" />}
              sx={{ display: 'flex', justifyContent: 'center' }}
            />
          </Grid>

          <Grid xs={12} sm={6}>
            <AppWidgetSummary
              title="Departments"
              total={data.numOfDepartments}
              color="error"
              icon={<img alt="icon" src="/assets/icons/glass/departments.png" />}
              sx={{ display: 'flex', justifyContent: 'center' }}
            />
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
