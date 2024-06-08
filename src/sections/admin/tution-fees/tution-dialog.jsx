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

import { getGradesTutionFees, createPaymentCodeForGrade } from 'src/api/tutionSlice';

import Iconify from 'src/components/iconify';

export default function TutionDialog({ open, setOpen, title }) {
  const dispatch = useDispatch();
  const classes = useSelector((state) => state.class.data);
  const grades = [...classes.reduce((acc, item) => acc.add(item.grade), new Set())];
  const [studentData, setStudentData] = useState({
    grade: '',
    amount: '',
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    toast.promise(dispatch(createPaymentCodeForGrade(studentData)), {
      pending: 'Fee is being created ...',
      success: {
        render({ data }) {
          dispatch(getGradesTutionFees());
          return data.payload.success;
        },
      },
      error: 'An Error Occured !',
    });
    setOpen(false);
    setStudentData({ grade: '', amount: '' });
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
        <FormControl fullWidth required style={{ marginTop: '10px' }}>
          <InputLabel id="grade-select-label">Grade</InputLabel>
          <Select
            labelId="grade-select-label"
            id="grade-select"
            label="grade *"
            value={studentData.grade}
            onChange={(e) => setStudentData({ ...studentData, grade: e.target.value })}
          >
            {grades.map((item, i) => (
              <MenuItem key={i} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          margin="dense"
          label="Amount *"
          type="number"
          value={studentData.amount}
          onChange={(e) => setStudentData({ ...studentData, amount: e.target.value })}
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

TutionDialog.propTypes = {
  title: PropTypes.any,
  open: PropTypes.any,
  setOpen: PropTypes.func,
};
