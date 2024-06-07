import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import route from 'src/routes';
import { getTeacherClasses } from 'src/api/classSlice';
import { getVarkResultsForTeacher } from 'src/api/varkSlice';
import { getTeacherDashboardData } from 'src/api/dashboardSlice';

import { Loader } from 'src/sections/loader';
import DifyChatbot from 'src/sections/ChatBot/ChatBot';
import AppWidgetSummary from 'src/sections/superAdmin/overview/app-widget-summary';

// ----------------------------------------------------------------------

export default function AppView() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [selected, setSelected] = useState(0);
  const { data, error, loading } = useSelector((state) => state.dashboard);
  //   const lang = useSelector((state) => state.language.value);
  const teacher = useSelector((state) => state.auth.data);
  const classes = useSelector((state) => state.class) || {};
  const vark = useSelector((state) => state.vark) || {};

  let keys = [];
  let values = [];
  let indexOfMaxLabel = null;
  //   removing the id from the object to dispose the id value
  if (vark.data.length > 0) {
    keys = Object.keys(vark.data[selected]).splice(1, 5);
    values = Object.values(vark.data[selected]).splice(1, 5);
    indexOfMaxLabel = values.indexOf(Math.max(...values)) || null;
  }

  const getLabel = (labelInitial) => {
    switch (labelInitial) {
      case 'v':
        return t('visual');
      case 'a':
        return t('auditory');
      case 'r':
        return t('read&write');
      case 'k':
        return t('kinesthetic');
      default:
        return t('undefined');
    }
  };

  useEffect(() => {
    if (vark.data.length <= 0) dispatch(getVarkResultsForTeacher(teacher.id));
  }, [dispatch, vark.data, teacher.id]);
  useEffect(() => {
    if (Object.keys(data).length < 1) dispatch(getTeacherDashboardData());
  }, [dispatch, data]);
  useEffect(() => {
    dispatch(getTeacherClasses(teacher.id));
  }, [dispatch, teacher.id]);

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
        <>
          <Grid container spacing={3} paddingY={5}>
            <Grid xs={12} sm={6}>
              <AppWidgetSummary
                title={t('periodsToday')}
                total={data.numOfPeriodsToday}
                color="info"
                icon={<img alt="icon" src="/assets/icons/glass/employee.png" />}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: '0.4s',
                  ...{ '&:hover': { background: '#eee' } },
                }}
                onClick={() => navigate(route.teacher.schedule)}
              />
            </Grid>

            <Grid xs={12} sm={6}>
              <AppWidgetSummary
                title={t('subjects')}
                total={data.numOfSubjects}
                color="warning"
                icon={<img alt="icon" src="/assets/icons/glass/students.png" />}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: '0.4s',
                  ...{ '&:hover': { background: '#eee' } },
                }}
                onClick={() => navigate(route.teacher.subjects)}
              />
            </Grid>
          </Grid>

          {classes.loading ? (
            <Loader />
          ) : (
            <>
              <Typography variant="h3">{t('varkResults')}</Typography>

              <Grid container spacing={2} paddingY={5}>
                <Grid container xs={12} sm={10} spacing={2}>
                  <Grid xs={12} md={6}>
                    <AppWidgetSummary
                      title={t('visual')}
                      total={vark.data[selected]?.v}
                      color="info"
                      icon={<img alt="icon" src="/assets/icons/glass/visual.png" />}
                      sx={{ display: 'flex', justifyContent: 'center' }}
                    />
                  </Grid>
                  <Grid xs={12} md={6}>
                    <AppWidgetSummary
                      title={t('auditory')}
                      total={vark.data[selected]?.a}
                      color="info"
                      icon={<img alt="icon" src="/assets/icons/glass/auditory.png" />}
                      sx={{ display: 'flex', justifyContent: 'center' }}
                    />
                  </Grid>
                  <Grid xs={12} md={6}>
                    <AppWidgetSummary
                      title={t('read&write')}
                      total={vark.data[selected]?.r}
                      color="info"
                      icon={<img alt="icon" src="/assets/icons/glass/read_write.png" />}
                      sx={{ display: 'flex', justifyContent: 'center' }}
                    />
                  </Grid>
                  <Grid xs={12} md={6}>
                    <AppWidgetSummary
                      title={t('kinesthetic')}
                      total={vark.data[selected]?.k}
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
                  {classes.data?.map((item, i) => (
                    <Box
                      key={item.id}
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
                {t('mostOfStudentsIn')}{' '}
                <Typography variant="span" fontWeight="bolder">
                  {`${classes.data[selected]?.grade}/${classes.data[selected]?.class_number}`}
                </Typography>{' '}
                {t('are')}{' '}
                <Typography variant="span" fontWeight="bolder">
                  {getLabel(keys[indexOfMaxLabel])}
                </Typography>{' '}
                {t('learners')}
              </Typography>
            </>
          )}
        </>
      )}

      <DifyChatbot />
    </Container>
  );
}
