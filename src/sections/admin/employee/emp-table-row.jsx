import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import { Box } from '@mui/material';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import TableCell from '@mui/material/TableCell';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';

import { getSubjects } from 'src/api/subjectSlice';
import { getEmployees, deleteEmployee, updateEmployee } from 'src/api/employeeSlice';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
// ----------------------------------------------------------------------

export default function EmpTableRow({ user, selected, handleClick }) {
  const dispatch = useDispatch();
  const { id, name, email, avatarUrl, subject, status } = user;
  const subjects = useSelector((state) => state.subject.data);
  const logedUser = useSelector((state) => state.auth.data);

  const [open, setOpen] = useState(null);
  const [edit, setEdit] = useState(false);
  const [empData, setEmpData] = useState({
    id,
    name,
    email,
    status,
    avatarUrl,
    subject_id: [subject[0]?.id],
  });

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
    toast.promise(dispatch(deleteEmployee(user)), {
      pending: 'Employee is being deleted ...',
      success: 'Employee is deleted !',
      error: 'An Error Occured !',
    });
    dispatch(getEmployees(logedUser.department_id));
    dispatch(getSubjects());
    setEmpData({ ...empData, status: false });
    handleCloseMenu();
  };

  const saveEditedRecord = () => {
    if (
      empData.avatarUrl === avatarUrl &&
      empData.name === name &&
      empData.email === email &&
      empData.subject_id === subjects.id &&
      empData.status === status
    ) {
      setEdit(false);
      return;
    }
    toast.promise(dispatch(updateEmployee(empData)), {
      pending: 'Employee is being updated ...',
      success: 'Employee is updated !',
      error: 'An Error Occured !',
    });
    dispatch(getEmployees(logedUser.department_id));
    dispatch(getSubjects());
    setEdit(false);
    // setEmpData()
  };

  const reset = () => {
    // toast.promise(dispatch(resetPassword(id)), {
    //   pending: 'Password is being reset ...',
    //   success: 'Password is reset successfully !',
    //   error: 'An Error Occured !',
    // });
    handleCloseMenu();
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={name} src={avatarUrl || `/assets/images/avatars/avatar_${id % 25}.jpg`} />
            {edit ? (
              <Box display="flex" gap="10px">
                <TextField
                  label="Name"
                  size="small"
                  value={empData.name}
                  onChange={(e) => setEmpData({ ...empData, name: e.target.value })}
                />
                <TextField
                  label="Email"
                  size="small"
                  value={empData.email}
                  onChange={(e) => setEmpData({ ...empData, email: e.target.value })}
                />
              </Box>
            ) : (
              <Box>
                <Typography variant="subtitle2" noWrap>
                  {name}
                </Typography>
                <Typography variant="caption" noWrap>
                  {email}
                </Typography>
              </Box>
            )}
          </Stack>
        </TableCell>

        {logedUser.department_id === 4 && (
          <TableCell sx={{ textTransform: 'capitalize' }}>
            {edit ? (
              <FormControl size="small" fullWidth>
                <InputLabel id="subject-edit-select-label">Subject</InputLabel>
                <Select
                  labelId="subject-edit-select-label"
                  id="subject-edit-select"
                  label="Subject *"
                  value={empData.subject_id}
                  onChange={(e) => setEmpData({ ...empData, subject_id: [e.target.value] })}
                >
                  {subjects?.map((sub) => (
                    <MenuItem key={sub.id} value={sub.id}>
                      {sub.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              subject[0].name || <Typography color="red">Not Found</Typography>
            )}
          </TableCell>
        )}

        <TableCell>
          {edit && !status ? (
            <FormControl size="small" fullWidth>
              <InputLabel id="status-edit-select-label">Status</InputLabel>
              <Select
                labelId="status-edit-select-label"
                id="status-edit-select"
                label="Status"
                value={empData.status}
                onChange={(e) => setEmpData({ ...empData, status: e.target.value })}
              >
                {[
                  { name: 'Active', value: 1 },
                  { name: 'Banned', value: 0 },
                ].map((statusData) => (
                  <MenuItem key={statusData.name} value={statusData.value}>
                    {statusData.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : (
            <Label color={status ? 'success' : 'error'}>{status ? 'Active' : 'Banned'}</Label>
          )}
        </TableCell>

        <TableCell align="center">
          {edit ? (
            <Box>
              <Tooltip title="Reset Password">
                <IconButton onClick={reset}>
                  <Iconify icon="solar:lock-linear" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Discard">
                <IconButton onClick={() => setEdit(false)}>
                  <Iconify icon="bi:x" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Save">
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
          Edit
        </MenuItem>

        <MenuItem onClick={handleDeleteRecord} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

EmpTableRow.propTypes = {
  user: PropTypes.any,
  handleClick: PropTypes.func,
  selected: PropTypes.any,
};
