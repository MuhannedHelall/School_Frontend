import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { getTeacherDashboardData } from 'src/api/dashboardSlice';

import { Loader } from 'src/sections/loader';
import DifyChatbot from 'src/sections/ChatBot/ChatBot';
import AppWidgetSummary from 'src/sections/superAdmin/overview/app-widget-summary';

// ----------------------------------------------------------------------

export default function AppView() {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(0);
  const { data, error, loading } = useSelector((state) => state.dashboard);
  const classes = [
    { class_id: 1, grade: '1', class_number: '1' },
    { class_id: 2, grade: '1', class_number: '2' },
    { class_id: 3, grade: '1', class_number: '3' },
  ];
  const results = [
    { class_id: 1, Visual: 5, Auditory: 7, Read_Write: 8, Kinesthetic: 12 },
    { class_id: 2, Visual: 15, Auditory: 2, Read_Write: 4, Kinesthetic: 8 },
    { class_id: 3, Visual: 7, Auditory: 6, Read_Write: 11, Kinesthetic: 2 },
  ];
  const keys = Object.keys(results[selected]);
  const values = Object.values(results[selected]);
  const index = values.indexOf(Math.max(...values));

  useEffect(() => {
    if (Object.keys(data).length < 1) dispatch(getTeacherDashboardData());
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
        <Loader />
      ) : (
        // <h1 style={{ textAlign: 'center', marginTop: '30vh' }}>Loading ...</h1>
        <Box>
          <Grid container spacing={3} paddingY={5}>
            <Grid xs={12} sm={6}>
              <AppWidgetSummary
                title="Periods Today"
                total={data.numOfPeriodsToday}
                color="info"
                icon={<img alt="icon" src="/assets/icons/glass/employee.png" />}
                sx={{ display: 'flex', justifyContent: 'center' }}
              />
            </Grid>

            <Grid xs={12} sm={6}>
              <AppWidgetSummary
                title="Subjects"
                total={data.numOfSubjects}
                color="warning"
                icon={<img alt="icon" src="/assets/icons/glass/students.png" />}
                sx={{ display: 'flex', justifyContent: 'center' }}
              />
            </Grid>
          </Grid>

          <Typography variant="h3">VARK Results</Typography>

          <Grid container spacing={2} paddingY={5}>
            <Grid container xs={12} sm={10} spacing={2}>
              <Grid xs={12} md={6}>
                <AppWidgetSummary
                  title="Visual"
                  total={results[selected].Visual}
                  color="info"
                  icon={<img alt="icon" src="/assets/icons/glass/visual.png" />}
                  sx={{ display: 'flex', justifyContent: 'center' }}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <AppWidgetSummary
                  title="Auditory"
                  total={results[selected].Auditory}
                  color="info"
                  icon={<img alt="icon" src="/assets/icons/glass/auditory.png" />}
                  sx={{ display: 'flex', justifyContent: 'center' }}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <AppWidgetSummary
                  title="Read & Write"
                  total={results[selected].Read_Write}
                  color="info"
                  icon={<img alt="icon" src="/assets/icons/glass/read_write.png" />}
                  sx={{ display: 'flex', justifyContent: 'center' }}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <AppWidgetSummary
                  title="Kinesthetic"
                  total={results[selected].Kinesthetic}
                  color="info"
                  icon={<img alt="icon" src="/assets/icons/glass/kinesthetic.png" />}
                  sx={{ display: 'flex', justifyContent: 'center' }}
                />
              </Grid>
            </Grid>

            <Grid
              xs={12}
              sm={2}
              className="d-flex flex-column justify-content-center align-items-center"
            >
              {classes.map((item, i) => (
                <Box
                  key={item.class_id}
                  className="rounded-3 p-5 p-md-0"
                  sx={{
                    ...{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: selected === i ? '#eee' : 'white',
                      border: '1px solid #eee',
                      '&:hover': {
                        cursor: 'pointer',
                        transition: '0.5s',
                        backgroundColor: '#eee',
                      },
                    },
                  }}
                  onClick={() => setSelected(i)}
                >
                  <Typography variant="subtitle1">{`${item.grade}/${item.class_number}`}</Typography>
                </Box>
              ))}
            </Grid>
          </Grid>

          <Typography variant="subtitle1" textAlign="center">
            Most of students in{' '}
            <Typography variant="span" fontWeight="bolder">
              {`${classes[selected].grade}/${classes[selected].class_number}`}
            </Typography>{' '}
            are{' '}
            <Typography variant="span" fontWeight="bolder">
              {keys[index]}
            </Typography>{' '}
            learners.
          </Typography>
        </Box>
      )}
      <DifyChatbot />
    </Container>
  );
}
