import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function UserTableToolbar({
  showSearch = true,
  title,
  numSelected,
  filterName,
  onFilterName,
  onOpenUpload,
}) {
  const { t } = useTranslation();
  return (
    <Toolbar
      sx={{
        height: 96,
        display: 'flex',
        justifyContent: 'space-between',
        p: (theme) => theme.spacing(0, 1, 0, 3),
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        showSearch && (
          <OutlinedInput
            value={filterName}
            onChange={onFilterName}
            placeholder={`${t('search')} ...`}
            startAdornment={
              <InputAdornment position="start">
                <Iconify
                  icon="eva:search-fill"
                  sx={{ color: 'text.disabled', width: 20, height: 20 }}
                />
              </InputAdornment>
            }
          />
        )
      )}

      {numSelected > 0 ? (
        <br />
      ) : (
        // <Tooltip title="Delete">
        //   <IconButton>
        //     <Iconify icon="eva:trash-2-fill" />
        //   </IconButton>
        // </Tooltip>
        <Tooltip title={t('uploadFile')}>
          <IconButton component="label" onClick={onOpenUpload}>
            <Iconify icon="solar:upload-outline" />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

UserTableToolbar.propTypes = {
  showSearch: PropTypes.bool,
  title: PropTypes.string,
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  onOpenUpload: PropTypes.func,
};
