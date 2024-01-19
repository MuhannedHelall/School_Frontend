import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import { addDepartment, getDepartments } from 'src/api/departmentSlice';

import Iconify from 'src/components/iconify';

export default function DepartmentAddDialog({ open, setOpen }) {
  const dispatch = useDispatch();
  const [deptData, setDeptData] = useState({ name: '' });

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    toast.promise(dispatch(addDepartment(deptData)), {
      pending: 'Department is being added ...',
      success: 'Department is added !',
      error: 'An Error Occured !',
    });
    
    setOpen(false);
    setDeptData({ name: '' });
    dispatch(getDepartments());
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <Iconify icon="eva:plus-fill" />
        Add New Department
      </DialogTitle>
      <DialogContent>
        <DialogContentText>Please fill up the form to add a new department.</DialogContentText>
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
        <Button onClick={handleAdd}>Add</Button>
      </DialogActions>
    </Dialog>
  );
}

DepartmentAddDialog.propTypes = {
  open: PropTypes.any,
  setOpen: PropTypes.func,
};
