import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

// import { fDate } from 'src/utils/format-time';
import { fShortenNumber } from 'src/utils/format-number';

import { getDepartments, deleteDepartment } from 'src/api/departmentSlice';

import Iconify from 'src/components/iconify';
import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

export default function DepartmentCard({ item, onUpdate }) {
  const {
    id,
    name = 'Not Found',
    numOfAdmins = 0,
    numOfEmps = 0,
    mainAdmin = {
      id: null,
      name: 'Not Assigned',
      avatarUrl: `/assets/images/avatars/avatar_${mainAdmin.id % 25}.jpg`,
    },
  } = item;
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
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = () => {
    toast.promise(dispatch(deleteDepartment(item)), {
      pending: 'Department is being deleted ...',
      success: 'Department is deleted !',
      error: 'An error occured !',
    });
    dispatch(getDepartments());
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

          <Avatar
            alt={mainAdmin.name}
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
          />

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
            {mainAdmin.name || 'Not Assigned'}
          </Typography>

          <Link
            onClick={() => navigate(`${id}`)}
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
              cursor: 'pointer',
            }}
          >
            {name}
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
              {[
                { data: numOfAdmins, icon: 'eos-icons:admin', title: 'Admins' },
                { data: numOfEmps, icon: 'ep:user', title: 'Employees' },
              ].map(
                (info, _index) =>
                  info.data > 0 && (
                    <Tooltip key={_index} title={info.title}>
                      <Stack direction="row">
                        <Iconify width={16} icon={info.icon} sx={{ mr: 0.5 }} />
                        <Typography variant="caption">{fShortenNumber(info.data)}</Typography>
                      </Stack>
                    </Tooltip>
                  )
              )}
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

DepartmentCard.propTypes = {
  item: PropTypes.object.isRequired,
  onUpdate: PropTypes.func,
};
