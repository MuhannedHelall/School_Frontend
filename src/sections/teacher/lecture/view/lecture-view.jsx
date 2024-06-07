import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { getLecture } from 'src/api/lecturesSlice';

import { BackButton } from 'src/components/back-button';

import { Loader } from 'src/sections/loader';
import { routeBackToSubjects } from 'src/sections/teacher/subjectsLectures/view/subject-lectures-view';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));

function LectureView() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { t } = useTranslation();
  const lecture = useSelector((state) => state.lectures);
  const user = useSelector((state) => state.auth.data);
  const { role } = user;

  const index = lecture.data.length
    ? lecture.data.findIndex((item) => item.id === lecture.show.id) + 1
    : 0;
  const CompeletionPercentage = lecture.data.length
    ? Math.ceil((index / lecture.data.length) * 100)
    : 0;

  useEffect(() => {
    dispatch(getLecture(id));
  }, [dispatch, id]);

  return (
    <>
      <BackButton to={routeBackToSubjects(role)} />

      {lecture.loading ? (
        <Loader />
      ) : (
        <>
          <Paper className="my-4 px-5 py-3" elevation={1}>
            <Box
              mb={2}
              sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <Typography variant="h3">{lecture.show?.subject?.name}</Typography>
              <Typography variant="caption">{`Mr. ${lecture.show?.employee?.name}`}</Typography>
            </Box>

            <hr />

            <Box sx={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
              <Box width="25%">
                <Typography variant="caption">
                  {CompeletionPercentage}% {t('complete')}
                </Typography>
                <BorderLinearProgress variant="determinate" value={CompeletionPercentage} />
              </Box>
              <Typography variant="subtitle2">
                {`${index}/${lecture.data?.length}`} {t('completed')}
              </Typography>
            </Box>
          </Paper>

          <Paper className="mt-3 p-4" elevation={1}>
            <Typography variant="h4">{lecture.show?.title}</Typography>

            <Box className="d-flex justify-content-center">
              <iframe
                title={lecture.show?.title}
                width="1070"
                height="600"
                src={lecture.show?.url}
                allowFullScreen
                className="rounded my-4"
              />
            </Box>

            <Typography variant="subtitle1">{lecture.show?.description}</Typography>
          </Paper>
        </>
      )}
    </>
  );
}

export default LectureView;
