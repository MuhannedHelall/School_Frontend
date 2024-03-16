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

import { getClasses } from 'src/api/classSlice';
import { addStudent, getStudents } from 'src/api/studentSlice';

import Iconify from 'src/components/iconify';

export default function StudentDialog({ open, setOpen, title }) {
  const dispatch = useDispatch();
  const classes = useSelector((state) => state.class.data);

  const [studentData, setStudentData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    class_id: classes[0]?.id,
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    toast.promise(dispatch(addStudent(studentData)), {
      pending: 'Student is being added ...',
      success: 'Student is added !',
      error: 'An Error Occured !',
    });
    dispatch(getClasses());
    dispatch(getStudents());
    setOpen(false);
    setStudentData({ name: '', email: '', phone: '', address: '', class_id: classes[0]?.id });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <Iconify icon="eva:plus-fill" />
        Add New {title.slice(0, title.length - 1)}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please fill up the form to add a new {title.slice(0, title.length - 1).toLowerCase()}.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Name"
          type="text"
          value={studentData.name}
          onChange={(e) => setStudentData({ ...studentData, name: e.target.value })}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Email Address"
          type="email"
          value={studentData.email}
          onChange={(e) => setStudentData({ ...studentData, email: e.target.value })}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Phone"
          type="text"
          value={studentData.phone}
          onChange={(e) => setStudentData({ ...studentData, phone: e.target.value })}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Address"
          type="text"
          value={studentData.address}
          onChange={(e) => setStudentData({ ...studentData, address: e.target.value })}
          fullWidth
        />
        <FormControl fullWidth required style={{ marginTop: '10px' }}>
          <InputLabel id="class-select-label">Class</InputLabel>
          <Select
            labelId="class-select-label"
            id="class-select"
            label="class *"
            value={studentData.class_id}
            onChange={(e) => setStudentData({ ...studentData, class_id: e.target.value })}
          >
            {classes.map((sub) => (
              <MenuItem key={sub.id} value={sub.id}>
                {sub.grade}
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

StudentDialog.propTypes = {
  title: PropTypes.any,
  open: PropTypes.any,
  setOpen: PropTypes.func,
};
