import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import { getDepartments, updateDepartment } from 'src/api/departmentSlice';

import Iconify from 'src/components/iconify';

export default function DepartmentUpdateDialog({ open, setOpen, deptData, setDeptData }) {
  const dispatch = useDispatch();
  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = () => {
    dispatch(updateDepartment(deptData));
    dispatch(getDepartments());
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <Iconify icon="bi:pencil" />
        Update Current Department
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please fill up the form to update the current department.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Name"
          type="text"
          value={deptData.name}
          onChange={(e) => setDeptData({ ...deptData, name: e.target.value })}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleUpdate}>Update</Button>
      </DialogActions>
    </Dialog>
  );
}

DepartmentUpdateDialog.propTypes = {
  open: PropTypes.any,
  deptData: PropTypes.any,
  setDeptData: PropTypes.func,
  setOpen: PropTypes.func,
};
