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
import { getAdmins, deleteAdmin, updateAdmin } from 'src/api/adminSlice';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
// ----------------------------------------------------------------------

export default function UserTableRow({ admin, selected, handleClick }) {
  const dispatch = useDispatch();
  const { id, name, email, avatarUrl, department, status } = admin;
  const departments = useSelector((state) => state.department.data);

  const [open, setOpen] = useState(null);
  const [edit, setEdit] = useState(false);
  const [adminData, setAdminData] = useState({
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
    toast.promise(dispatch(deleteAdmin(admin)), {
      pending: 'Admin is being deleted ...',
      success: 'Admin is deleted !',
      error: 'An Error Occured !',
    });
    dispatch(getAdmins());
    dispatch(getDepartments());
    setAdminData({ ...adminData, status: false });
    handleCloseMenu();
  };

  const saveEditedRecord = () => {
    if (
      adminData.avatarUrl === avatarUrl &&
      adminData.name === name &&
      adminData.email === email &&
      adminData.department_id === department.id &&
      adminData.status === status
    ) {
      setEdit(false);
      return;
    }
    toast.promise(dispatch(updateAdmin(adminData)), {
      pending: 'Admin is being updated ...',
      success: 'Admin is updated !',
      error: 'An Error Occured !',
    });
    dispatch(getAdmins());
    dispatch(getDepartments());
    setEdit(false);
  };

  const resetPassword = () => {};

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
                  value={adminData.name}
                  onChange={(e) => setAdminData({ ...adminData, name: e.target.value })}
                />
                <TextField
                  label="Email"
                  size="small"
                  value={adminData.email}
                  onChange={(e) => setAdminData({ ...adminData, email: e.target.value })}
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
                value={adminData.department_id}
                onChange={(e) => setAdminData({ ...adminData, department_id: e.target.value })}
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
                value={adminData.status}
                onChange={(e) => setAdminData({ ...adminData, status: e.target.value })}
              >
                {[
                  { name: 'Active', value: true },
                  { name: 'Banned', value: false },
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
                <IconButton onClick={resetPassword}>
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

UserTableRow.propTypes = {
  admin: PropTypes.any,
  handleClick: PropTypes.func,
  selected: PropTypes.any,
};
