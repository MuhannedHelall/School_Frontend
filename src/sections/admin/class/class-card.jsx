import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
// import Avatar from '@mui/material/Avatar';
// import Tooltip from '@mui/material/Tooltip';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

// import { fShortenNumber } from 'src/utils/format-number';

import { getClasses, deleteClass } from 'src/api/classSlice';

import Iconify from 'src/components/iconify';
import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

export default function ClassCard({ item, onUpdate }) {
  const { id, class_number = 'Not Found', grade = 0 } = item;
  const dispatch = useDispatch();
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

  const handleDelete = () => {
    toast.promise(dispatch(deleteClass(item)), {
      pending: 'Subject is being deleted ...',
      success: 'Subject is deleted !',
      error: 'An error occured !',
    });
    dispatch(getClasses());
  };

  return (
    <Grid xs={12} sm={6} md={4}>
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

          {/* <Avatar
            alt={class_number}
            src={
              mainAdmin.avatarUrl ||
              (mainAdmin.id && `/assets/images/avatars/avatar_${mainAdmin.id % 25}.jpg`)
            }
            sx={{
              position: 'absolute',
              zIndex: 9,
              width: 32,
              height: 32,
              left: (theme) => theme.spacing(3),
              bottom: (theme) => theme.spacing(-2),
            }}
          /> */}

          <Box
            component="div"
            sx={{
              position: 'absolute',
              top: 0,
              width: 1,
              height: 1,
              backgroundColor: colors[(id - 1) % colors.length],
            }}
          />
        </Box>

        <Box sx={{ p: (theme) => theme.spacing(4, 3, 3, 3) }}>
          <Typography variant="caption" component="div" sx={{ mb: 1, color: 'text.disabled' }}>
            {grade || 'Not Assigned'}
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
            {class_number}
          </Link>
          <Box display="flex" justifyContent="space-between">
            <Stack
              direction="row"
              flexWrap="wrap"
              spacing={1.5}
              sx={{
                mt: 3,
                color: 'text.disabled',
              }}
            >
              {/* {numOfTeachers > 0 && (
                <Tooltip title="Teachers">
                  <Stack direction="row">
                    <Iconify width={16} icon="eos-icons:admin" sx={{ mr: 0.5 }} />
                    <Typography variant="caption">{fShortenNumber(numOfTeachers)}</Typography>
                  </Stack>
                </Tooltip>
              )} */}
            </Stack>
            <Stack
              direction="row"
              flexWrap="wrap"
              spacing={1.5}
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
                      color: 'black',
                    },
                  },
                }}
                onClick={() => onUpdate(item)}
              >
                <Iconify width={16} icon="mdi:pencil-outline" sx={{ mr: 0.5 }} />
                <Typography variant="caption">update</Typography>
              </Stack>
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
                onClick={handleDelete}
              >
                <Iconify width={16} icon="bi:x" sx={{ mr: 0.5 }} />
                <Typography variant="caption">delete</Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
      </Card>
    </Grid>
  );
}

ClassCard.propTypes = {
  item: PropTypes.object.isRequired,
  onUpdate: PropTypes.func,
};
