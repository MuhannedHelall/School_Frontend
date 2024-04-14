import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Select from '@mui/material/Select';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import { addAdmin, getAdmins } from 'src/api/adminSlice';
import { getDepartments } from 'src/api/departmentSlice';

import Iconify from 'src/components/iconify';

export default function GradeAddDialog({ open, setOpen }) {
  const dispatch = useDispatch();
  const departments = useSelector((state) => state.department.data);
  const [studentGrades, setStudentGrades] = useState({ name: '', email: '', department_id: '1' });

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    toast.promise(dispatch(addAdmin(studentGrades)), {
      pending: 'Admin is being added ...',
      success: 'Admin is added !',
      error: 'An Error Occured !',
    });
    dispatch(getDepartments());
    dispatch(getAdmins());
    setOpen(false);
    setStudentGrades({ name: '', email: '', department_id: '1' });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <Iconify icon="eva:plus-fill" />
        Add New Admin
      </DialogTitle>
      <DialogContent>
        <DialogContentText>Please fill up the form to add a new admin.</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Name"
          type="text"
          value={studentGrades.name}
          onChange={(e) => setStudentGrades({ ...studentGrades, name: e.target.value })}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Email Address"
          type="email"
          value={studentGrades.email}
          onChange={(e) => setStudentGrades({ ...studentGrades, email: e.target.value })}
          fullWidth
        />
        <FormControl fullWidth required style={{ marginTop: '10px' }}>
          <InputLabel id="department-select-label">Department</InputLabel>
          <Select
            labelId="department-select-label"
            id="department-select"
            label="Department *"
            value={studentGrades.department_id}
            onChange={(e) => setStudentGrades({ ...studentGrades, department_id: e.target.value })}
          >
            {departments.map((dept) => (
              <MenuItem key={dept.id} value={dept.id}>
                {dept.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleAdd}>Add</Button>
      </DialogActions>
    </Dialog>
  );
}

GradeAddDialog.propTypes = {
  open: PropTypes.any,
  setOpen: PropTypes.func,
};
