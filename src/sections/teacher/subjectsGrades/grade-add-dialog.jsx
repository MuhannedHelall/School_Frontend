import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const students = useSelector((state) => state.student.data);
  const grades = useSelector((state) => state.grade.data);
  const user = useSelector((state) => state.auth.data);
  const [studentGrades, setStudentGrades] = useState({
    student_id: null,
    subject_id: +id,
    midterm: 0,
    final: 0,
    attendance: 0,
    behavior: 0,
    total: 0,
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
        {user.role === 'student' ? (
          <>
            <Iconify icon="eva:eye-fill" />
            {t('viewGrades')}
          </>
        ) : (
          <>
            <Iconify icon="eva:plus-fill" />
            {t('addNewGrade')}
          </>
        )}
      </DialogTitle>
      <DialogContent>
        {user.role !== 'student' && (
          <>
            <DialogContentText>{t('fillFormToAddNewStudentGrade')}</DialogContentText>
            <FormControl fullWidth required style={{ marginTop: '10px' }}>
              <InputLabel id="student-select-label">{t('student')}</InputLabel>
              <Select
                labelId="student-select-label"
                id="student-select"
                label={`${t('student')} *`}
                value={studentGrades.student_id}
                onChange={(e) => setStudentGrades({ ...studentGrades, student_id: e.target.value })}
              >
                {students.map((student) => (
                  <MenuItem key={student.id} value={student.student_id}>
                    {student.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </>
        )}

        <TextField
          margin="dense"
          label={`${t('midterm')} *`}
          type="number"
          value={user.role === 'student' ? grades[0]?.grades?.midterm : studentGrades.midterm}
          onChange={(e) => setStudentGrades({ ...studentGrades, midterm: e.target.value })}
          fullWidth
          disabled={user.role === 'student'}
        />
        <TextField
          margin="dense"
          label={`${t('final')} *`}
          type="number"
          value={user.role === 'student' ? grades[0]?.grades?.final : studentGrades.final}
          onChange={(e) => setStudentGrades({ ...studentGrades, final: e.target.value })}
          fullWidth
          disabled={user.role === 'student'}
        />
        <TextField
          margin="dense"
          label={`${t('attendance')} *`}
          type="number"
          value={user.role === 'student' ? grades[0]?.grades?.attendance : studentGrades.attendance}
          onChange={(e) => setStudentGrades({ ...studentGrades, attendance: e.target.value })}
          fullWidth
          disabled={user.role === 'student'}
        />
        <TextField
          margin="dense"
          label={`${t('behavior')} *`}
          type="number"
          value={user.role === 'student' ? grades[0]?.grades?.behavior : studentGrades.behavior}
          onChange={(e) => setStudentGrades({ ...studentGrades, behavior: e.target.value })}
          fullWidth
          disabled={user.role === 'student'}
        />
        <TextField
          margin="dense"
          label={`${t('total')} *`}
          type="number"
          value={user.role === 'student' ? grades[0]?.grades?.total : studentGrades.total}
          onChange={(e) => setStudentGrades({ ...studentGrades, total: e.target.value })}
          fullWidth
          disabled={user.role === 'student'}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{t('discard')}</Button>
        {!grades[0]?.grades?.total && <Button onClick={handleAdd}>{t('save')}</Button>}
      </DialogActions>
    </Dialog>
  );
}

GradeAddDialog.propTypes = {
  open: PropTypes.any,
  setOpen: PropTypes.func,
};
