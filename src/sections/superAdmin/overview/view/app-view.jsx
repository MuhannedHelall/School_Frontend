import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Box, Button } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import route from 'src/routes';
import { trainModel } from 'src/api/authSlice';
import { getSuperDashboardData } from 'src/api/dashboardSlice';

import { Loader } from 'src/sections/loader';

import AppWidgetSummary from '../app-widget-summary';
// ----------------------------------------------------------------------

export default function AppView() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data, error, loading } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(getSuperDashboardData());
  }, [dispatch]);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        {t('greeting')}
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
        <Loader />
      ) : (
        <Grid container spacing={3} padding={10}>
          <Grid xs={12} sm={6}>
            <AppWidgetSummary
              title={t('admins')}
              total={data.numOfAdmins}
              color="success"
              icon={<img alt="icon" src="/assets/icons/glass/admins.png" />}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: '0.4s',
                ...{ '&:hover': { background: '#eee' } },
              }}
              onClick={() => navigate(route.super.admins)}
            />
          </Grid>

          <Grid xs={12} sm={6}>
            <AppWidgetSummary
              title={t('employees')}
              total={data.numOfEmployees}
              color="info"
              icon={<img alt="icon" src="/assets/icons/glass/employee.png" />}
              sx={{ display: 'flex', justifyContent: 'center' }}
            />
          </Grid>

          <Grid xs={12} sm={6}>
            <AppWidgetSummary
              title={t('students')}
              total={data.numOfStudents}
              color="warning"
              icon={<img alt="icon" src="/assets/icons/glass/students.png" />}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: '0.4s',
                ...{ '&:hover': { background: '#eee' } },
              }}
              onClick={() => navigate(route.super.deptsId + 5)}
            />
          </Grid>

          <Grid xs={12} sm={6}>
            <AppWidgetSummary
              title={t('departments')}
              total={data.numOfDepartments}
              color="error"
              icon={<img alt="icon" src="/assets/icons/glass/departments.png" />}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: '0.4s',
                ...{ '&:hover': { background: '#eee' } },
              }}
              onClick={() => navigate(route.super.depts)}
            />
          </Grid>
        </Grid>
      )}
      <Box className="d-flex justify-content-center">
        <Button
          variant="outlined"
          onClick={() =>
            toast.promise(dispatch(trainModel()), {
              pending: 'Getting your pictures prepared ...',
              success: 'Training is successful !',
              error: 'An error has occured !',
            })
          }
        >
          {t('trainModel')}
        </Button>
      </Box>
    </Container>
  );
}
