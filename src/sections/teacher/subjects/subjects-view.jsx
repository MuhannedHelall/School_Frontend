import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import route from 'src/routes';

import Iconify from 'src/components/iconify';
import SvgColor from 'src/components/svg-color';

import { Loader } from 'src/sections/loader';

export default function SubjectsView() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth);
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

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Subjects</Typography>
      </Stack>

      {user.loading ? (
        <Loader />
      ) : (
        <Box>
          {user.data?.subject?.length < 1 ? (
            <h1 style={{ textAlign: 'center', marginTop: '150px' }}>No subjects to show ...</h1>
          ) : (
            <Grid container spacing={3}>
              {user.data?.subject?.map((item) => (
                <Grid key={item.id} xs={12} sm={6} md={4}>
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
                        alt={user.data?.user?.name}
                        src={
                          user.data.avatarUrl ||
                          (user.data.user_id &&
                            `/assets/images/avatars/avatar_${user.data.user_id % 25}.jpg`)
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
                        {user.data?.user?.name || 'Not Assigned'}
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
                        {item.name}
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
                          onClick={() => navigate(`${route.teacher.subjectLectures}${item.id}`)}
                        >
                          <Typography variant="caption">lectures</Typography>
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
                          onClick={() => navigate(`${route.teacher.subjectGrades}${item.id}`)}
                        >
                          <Typography variant="caption">grades</Typography>
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
    </Container>
  );
}
