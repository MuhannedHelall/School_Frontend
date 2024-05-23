import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
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

import { getSubjects } from 'src/api/subjectSlice';
import { getAdminDashboardData } from 'src/api/dashboardSlice';
import { addEmployee, getEmployees } from 'src/api/employeeSlice';

import Iconify from 'src/components/iconify';

export default function EmpAddDialog({ open, setOpen, title }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const subjects = useSelector((state) => state.subject.data);
  const user = useSelector((state) => state.auth.data);

  const [empData, setEmpData] = useState({
    name: '',
    email: '',
    department_id: user.department_id || +id,
    subject_id: null,
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    toast.promise(dispatch(addEmployee(empData)), {
      pending: `${title.slice(0, title.length - 1)} is being added ...`,
      success: `${title.slice(0, title.length - 1)} is added !`,
      error: `An Error Occured !`,
    });
    dispatch(getSubjects());
    dispatch(getEmployees(user.department_id || +id));
    dispatch(getAdminDashboardData());
    setOpen(false);
    setEmpData({ name: '', email: '', department_id: user.department_id || +id, subject_id: null });
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
          value={empData.name}
          onChange={(e) => setEmpData({ ...empData, name: e.target.value })}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Email Address"
          type="email"
          value={empData.email}
          onChange={(e) => setEmpData({ ...empData, email: e.target.value })}
          fullWidth
        />
        {(user.department_id === 4 || +id === 4) && (
          <FormControl fullWidth required style={{ marginTop: '10px' }}>
            <InputLabel id="subject-select-label">subject</InputLabel>
            <Select
              labelId="subject-select-label"
              id="subject-select"
              label="Subject *"
              value={empData.subject_id}
              onChange={(e) => setEmpData({ ...empData, subject_id: e.target.value })}
            >
              {subjects.map((sub) => (
                <MenuItem key={sub.id} value={sub.id}>
                  {sub.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleAdd}>Add</Button>
      </DialogActions>
    </Dialog>
  );
}

EmpAddDialog.propTypes = {
  title: PropTypes.any,
  open: PropTypes.any,
  setOpen: PropTypes.func,
};
