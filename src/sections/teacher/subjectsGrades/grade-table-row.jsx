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

import { getDepartments } from 'src/api/departmentSlice';
import { getAdmins, deleteAdmin, updateAdmin, resetPassword } from 'src/api/adminSlice';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
// ----------------------------------------------------------------------

export default function GradeTableRow({ user, selected, handleClick }) {
  const dispatch = useDispatch();
  const { id, name, email, avatarUrl, department, status } = user;
  const departments = useSelector((state) => state.department.data);

  const [open, setOpen] = useState(null);
  const [edit, setEdit] = useState(false);
  const [studentData, setStudentData] = useState({
    id,
    name,
    email,
    status,
    avatarUrl,
    department_id: department.id,
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
    toast.promise(dispatch(deleteAdmin(user)), {
      pending: 'Admin is being deleted ...',
      success: 'Admin is deleted !',
      error: 'An Error Occured !',
    });
    dispatch(getAdmins());
    dispatch(getDepartments());
    setStudentData({ ...studentData, status: false });
    handleCloseMenu();
  };

  const saveEditedRecord = () => {
    if (
      studentData.avatarUrl === avatarUrl &&
      studentData.name === name &&
      studentData.email === email &&
      studentData.department_id === department.id &&
      studentData.status === status
    ) {
      setEdit(false);
      return;
    }
    toast.promise(dispatch(updateAdmin(studentData)), {
      pending: 'Admin is being updated ...',
      success: 'Admin is updated !',
      error: 'An Error Occured !',
    });
    dispatch(getAdmins());
    dispatch(getDepartments());
    setEdit(false);
  };

  const reset = () => {
    toast.promise(dispatch(resetPassword(id)), {
      pending: 'Password is being reset ...',
      success: 'Password is reset successfully !',
      error: 'An Error Occured !',
    });
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
                  value={studentData.name}
                  onChange={(e) => setStudentData({ ...studentData, name: e.target.value })}
                />
                <TextField
                  label="Email"
                  size="small"
                  value={studentData.email}
                  onChange={(e) => setStudentData({ ...studentData, email: e.target.value })}
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

        <TableCell>
          {edit ? (
            <FormControl size="small" fullWidth>
              <InputLabel id="department-edit-select-label">Department</InputLabel>
              <Select
                labelId="department-edit-select-label"
                id="department-edit-select"
                label="Department"
                value={studentData.department_id}
                onChange={(e) => setStudentData({ ...studentData, department_id: e.target.value })}
              >
                {departments?.map((dept) => (
                  <MenuItem key={dept.id} value={dept.id}>
                    {dept.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : (
            department.name || <Typography color="red">Not Found</Typography>
          )}
        </TableCell>

        <TableCell>
          {edit && !status ? (
            <FormControl size="small" fullWidth>
              <InputLabel id="status-edit-select-label">Status</InputLabel>
              <Select
                labelId="status-edit-select-label"
                id="status-edit-select"
                label="Status"
                value={studentData.status}
                onChange={(e) => setStudentData({ ...studentData, status: e.target.value })}
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

GradeTableRow.propTypes = {
  user: PropTypes.any,
  handleClick: PropTypes.func,
  selected: PropTypes.any,
};
