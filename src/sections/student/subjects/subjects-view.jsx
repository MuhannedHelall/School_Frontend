import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import route from 'src/routes';
import { getGrade } from 'src/api/gradeSlice';
import { getSubjectsForClass } from 'src/api/subjectSlice';

import Iconify from 'src/components/iconify';
import SvgColor from 'src/components/svg-color';

import { Loader } from 'src/sections/loader';
import GradeAddDialog from 'src/sections/teacher/subjectsGrades/grade-add-dialog';

export default function SubjectsView() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.data);
  const subjects = useSelector((state) => state.subject);
  const colors = [
    'red',
    'yellow',
    'green',
    'blue',
    'brown',
    'black',
    'gray',
    'purple',
    'aqua',
    'orange',
  ];
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(getSubjectsForClass(user.class?.id));
  }, [dispatch, user]);

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">{t('subjects')}</Typography>
      </Stack>

      {subjects.loading ? (
        <Loader />
      ) : (
        <Box>
          {subjects.length < 1 ? (
            <h1 style={{ textAlign: 'center', marginTop: '150px' }}>{t('noSubjectsToShow')}</h1>
          ) : (
            <Grid container spacing={3}>
              {subjects.data.map((item) => (
                <Grid key={item?.id} xs={12} sm={6} md={4}>
                  <Card>
                    <Box sx={{ position: 'relative', pt: '20px' }}>
                      <SvgColor
                        color="paper"
                        src="/assets/icons/shape-avatar.svg"
                        sx={{
                          position: 'absolute',
                          bottom: -15,
                          width: 80,
                          height: 36,
                          zIndex: 9,
                          color: 'background.paper',
                        }}
                      />

                      <Avatar
                        alt={item.teacher?.name}
                        src={
                          user?.avatarUrl ||
                          (item.user_id && `/assets/images/avatars/avatar_${item.user_id % 25}.jpg`)
                        }
                        sx={{
                          position: 'absolute',
                          zIndex: 9,
                          width: 32,
                          height: 32,
                          left: (theme) => theme.spacing(3),
                          bottom: (theme) => theme.spacing(-2),
                        }}
                      />

                      <Box
                        component="div"
                        sx={{
                          position: 'absolute',
                          top: 0,
                          width: 1,
                          height: 1,
                          backgroundColor: colors[(item.id - 1) % colors.length],
                        }}
                      />
                    </Box>

                    <Box sx={{ p: (theme) => theme.spacing(4, 3, 3, 3) }}>
                      <Typography
                        variant="caption"
                        component="div"
                        sx={{ mb: 1, color: 'text.disabled' }}
                      >
                        {item.teacher?.name || t('notAssigned')}
                      </Typography>

                      <Link
                        color="inherit"
                        variant="h6"
                        underline="hover"
                        sx={{
                          height: 30,
                          overflow: 'hidden',
                          WebkitLineClamp: 2,
                          display: '-webkit-box',
                          WebkitBoxOrient: 'vertical',
                          textTransform: 'capitalize',
                        }}
                      >
                        {item?.name}
                      </Link>
                      <Stack
                        direction="row"
                        spacing={2}
                        sx={{
                          mt: 3,
                          color: 'text.disabled',
                        }}
                      >
                        <Stack
                          direction="row"
                          sx={{
                            cursor: 'pointer',
                            transition: '200ms',
                            ...{
                              '&:hover': {
                                color: 'red',
                              },
                            },
                          }}
                          onClick={() => navigate(`${route.student.subjectLectures}${item?.id}`)}
                        >
                          <Typography variant="caption">{t('lectures')}</Typography>
                          <Iconify width={16} icon="mdi:lecture" sx={{ ml: 0.5 }} />
                        </Stack>
                        <Stack
                          direction="row"
                          sx={{
                            cursor: 'pointer',
                            transition: '200ms',
                            ...{
                              '&:hover': {
                                color: 'black',
                              },
                            },
                          }}
                          //   onClick={() => navigate(`${route.student.subjectGrades}${item.id}`)}
                          onClick={() =>
                            toast.promise(
                              dispatch(
                                getGrade({
                                  subject_id: item.id,
                                  student_id: user.user.student_id,
                                })
                              ),
                              {
                                pending: 'Finding your grades ...',
                                success: {
                                  render({ data }) {
                                    if (data.error) {
                                      toast.error(JSON.parse(data.error.message).error);
                                      return 'Loaded Successfully!';
                                    }
                                    setOpen(true);
                                    return 'Grades are Loaded !';
                                  },
                                },
                                error: {
                                  render({ data }) {
                                    return data.message;
                                  },
                                },
                              }
                            )
                          }
                        >
                          <Typography variant="caption">{t('grades')}</Typography>
                          <Iconify
                            width={16}
                            icon="healthicons:i-exam-qualification-outline"
                            sx={{ ml: 0.5 }}
                          />
                        </Stack>
                      </Stack>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      )}
      <GradeAddDialog open={open} setOpen={setOpen} />
    </Container>
  );
}
