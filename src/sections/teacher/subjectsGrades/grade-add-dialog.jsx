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

import { addGrade, getGrades } from 'src/api/gradeSlice';

import Iconify from 'src/components/iconify';

export default function GradeAddDialog({ open, setOpen }) {
  const { id } = useParams();
  const dispatch = useDispatch();

  const students = useSelector((state) => state.student.data);
  const grades = useSelector((state) => state.grade.data);
  const [studentGrades, setStudentGrades] = useState({
    student_id: null,
    subject_id: +id,
    midterm: null,
    final: null,
    attendance: null,
    behavior: null,
    total: null,
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    toast.promise(dispatch(addGrade(studentGrades)), {
      pending: 'Student Grade is being added ...',
      success: 'Student Grade is added !',
      error: 'An Error Occured !',
    });
    dispatch(getGrades(+id));
    setOpen(false);
    setStudentGrades({
      student_id: null,
      subject_id: +id,
      midterm: null,
      final: null,
      attendance: null,
      behavior: null,
      total: null,
    });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        {grades[0]?.grades?.final ? (
          <>
            <Iconify icon="eva:eye-fill" />
            View your grades
          </>
        ) : (
          <>
            <Iconify icon="eva:plus-fill" />
            Add New Grade
          </>
        )}
      </DialogTitle>
      <DialogContent>
        {grades[0]?.grades?.final ? (
          ''
        ) : (
          <>
            <DialogContentText>
              Please fill up the form to add a new student grade.
            </DialogContentText>
            <FormControl fullWidth required style={{ marginTop: '10px' }}>
              <InputLabel id="student-select-label">Student</InputLabel>
              <Select
                labelId="student-select-label"
                id="student-select"
                label="Student *"
                value={studentGrades.student_id}
                onChange={(e) => setStudentGrades({ ...studentGrades, student_id: e.target.value })}
              >
                {students.map((student) => (
                  <MenuItem key={student.id} value={student.id}>
                    {student.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </>
        )}

        <TextField
          margin="dense"
          label="Midterm *"
          type="number"
          value={grades[0]?.grades?.midterm || studentGrades.midterm}
          onChange={(e) => setStudentGrades({ ...studentGrades, midterm: e.target.value })}
          fullWidth
          disabled={grades[0]?.grades?.midterm}
        />
        <TextField
          margin="dense"
          label="Final *"
          type="number"
          value={grades[0]?.grades?.final || studentGrades.final}
          onChange={(e) => setStudentGrades({ ...studentGrades, final: e.target.value })}
          fullWidth
          disabled={grades[0]?.grades?.final}
        />
        <TextField
          margin="dense"
          label="Attendance *"
          type="number"
          value={grades[0]?.grades?.attendance || studentGrades.attendance}
          onChange={(e) => setStudentGrades({ ...studentGrades, attendance: e.target.value })}
          fullWidth
          disabled={grades[0]?.grades?.attendance}
        />
        <TextField
          margin="dense"
          label="Behavior *"
          type="number"
          value={grades[0]?.grades?.behavior || studentGrades.behavior}
          onChange={(e) => setStudentGrades({ ...studentGrades, behavior: e.target.value })}
          fullWidth
          disabled={grades[0]?.grades?.behavior}
        />
        <TextField
          margin="dense"
          label="Total *"
          type="number"
          value={grades[0]?.grades?.total || studentGrades.total}
          onChange={(e) => setStudentGrades({ ...studentGrades, total: e.target.value })}
          fullWidth
          disabled={grades[0]?.grades?.total}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        {grades[0]?.grades?.total ? '' : <Button onClick={handleAdd}>Add</Button>}
      </DialogActions>
    </Dialog>
  );
}

GradeAddDialog.propTypes = {
  open: PropTypes.any,
  setOpen: PropTypes.func,
};
