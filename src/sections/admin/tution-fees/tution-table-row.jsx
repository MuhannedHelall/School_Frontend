import { useState } from 'react';
import PropTypes from 'prop-types';
// import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import Tooltip from '@mui/material/Tooltip';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import TableCell from '@mui/material/TableCell';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
// ----------------------------------------------------------------------

export default function TutionTableRow({ user, selected, handleClick }) {
  const { id, grade, amount } = user;
  const classes = useSelector((state) => state.class.data);
  const grades = [...classes.reduce((acc, item) => acc.add(item.grade), new Set())];
  const { t } = useTranslation();

  const [open, setOpen] = useState(null);
  const [edit, setEdit] = useState(false);
  const [tutionFees, setTutionFees] = useState({ id, grade, amount });

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleEditRecord = () => {
    setEdit(true);
    handleCloseMenu();
  };

  const handleDeleteRecord = () => {
    // toast.promise(dispatch(deleteStudent(user)), {
    //   pending: 'Student is being deleted ...',
    //   success: 'Student is deleted !',
    //   error: 'An Error Occured !',
    // });

    // if (subject_id) dispatch(getStudentsInClass(subject_id));
    // else dispatch(getStudents());

    // setTutionFees({ ...tutionFees, status: false });
    handleCloseMenu();
  };

  const saveEditedRecord = () => {
    // if (
    //   tutionFees.avatarUrl === avatarUrl &&
    //   tutionFees.name === name &&
    //   tutionFees.email === email &&
    //   tutionFees.class_id === user.class.id &&
    //   tutionFees.status === status
    // ) {
    //   setEdit(false);
    //   return;
    // }
    // toast.promise(dispatch(updateStudent(tutionFees)), {
    //   pending: 'Student is being updated ...',
    //   success: 'Student is Updated !',
    //   error: 'An Error Occured !',
    // });
    // if (subject_id) dispatch(getStudentsInClass(subject_id));
    // else dispatch(getStudents());
    setEdit(false);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell>
          {edit ? (
            <FormControl size="small" fullWidth>
              <InputLabel id="grade-edit-select-label">Grade</InputLabel>
              <Select
                labelId="grade-edit-select-label"
                id="grade-edit-select"
                label="grade *"
                value={tutionFees.grade_id}
                onChange={(e) => setTutionFees({ ...tutionFees, grade: e.target.value })}
              >
                {grades?.map((item, i) => (
                  <MenuItem key={i} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : (
            <Label color="success">{grade}</Label> || <Label color="error">{t('notFound')}</Label>
          )}
        </TableCell>

        <TableCell>
          {edit ? (
            <TextField
              label="Amount *"
              variant="outlined"
              size="small"
              type="number"
              value={tutionFees.amount}
              onChange={(e) => setTutionFees({ ...tutionFees, amount: e.target.value })}
            />
          ) : (
            amount
          )}
        </TableCell>

        <TableCell align="center">
          {edit ? (
            <Box>
              <Tooltip title={t('discard')}>
                <IconButton onClick={() => setEdit(false)}>
                  <Iconify icon="bi:x" />
                </IconButton>
              </Tooltip>
              <Tooltip title={t('save')}>
                <IconButton onClick={saveEditedRecord}>
                  <Iconify icon="mingcute:check-fill" />
                </IconButton>
              </Tooltip>
            </Box>
          ) : (
            <IconButton onClick={handleOpenMenu}>
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
          )}
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleEditRecord}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          {t('edit')}
        </MenuItem>

        <MenuItem onClick={handleDeleteRecord} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          {t('delete')}
        </MenuItem>
      </Popover>
    </>
  );
}

TutionTableRow.propTypes = {
  user: PropTypes.any,
  handleClick: PropTypes.func,
  selected: PropTypes.any,
};
