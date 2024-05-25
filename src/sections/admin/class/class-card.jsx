import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
// import Avatar from '@mui/material/Avatar';
// import Tooltip from '@mui/material/Tooltip';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

// import { fShortenNumber } from 'src/utils/format-number';

import route from 'src/routes';
import { getClasses, deleteClass } from 'src/api/classSlice';

import Iconify from 'src/components/iconify';
// import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

export default function ClassCard({ item, onUpdate, onAttach, onDetach }) {
  const { id, class_number, grade } = item;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      pending: t('classBeingDeleted'),
      success: t('classDeleted'),
      error: t('errorOccured'),
    });
    dispatch(getClasses());
  };

  return (
    <Grid xs={12} sm={6} md={4}>
      <Card>
        <Box sx={{ position: 'relative', pt: '20px' }}>
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
          <Link
            color="inherit"
            variant="h6"
            underline="hover"
            onClick={() => navigate(route.admin.studentsSubjectId + id)}
            sx={{
              height: 30,
              overflow: 'hidden',
              WebkitLineClamp: 2,
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              textTransform: 'capitalize',
              ...{
                '&:hover': {
                  cursor: 'pointer',
                },
              },
            }}
          >
            {`${grade}/${class_number}`}
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
                onClick={() => onAttach(item)}
              >
                <Iconify width={16} icon="teenyicons:attach-solid" sx={{ mr: 0.5 }} />
                <Typography variant="caption">{t('attach')}</Typography>
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
                onClick={() => onDetach(item)}
              >
                <Iconify width={16} icon="gala:remove" sx={{ mr: 0.5 }} />
                <Typography variant="caption">{t('detach')}</Typography>
              </Stack>
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
                <Typography variant="caption">{t('edit')}</Typography>
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
                <Typography variant="caption">{t('delete')}</Typography>
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
  onAttach: PropTypes.func,
  onDetach: PropTypes.func,
};
