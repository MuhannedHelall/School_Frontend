import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Select from '@mui/material/Select';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import { addPeriod } from 'src/api/timeSlice';

import Iconify from 'src/components/iconify';

export default function PeriodDialog({ open, setOpen }) {
  const dispatch = useDispatch();
  const scheduleData = useSelector((state) => state.time.data);

  const [period, setPeriod] = useState({
    teacher_id: null,
    subject_id: null,
    class_id: null,
    period: null,
    day: null,
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    toast.promise(dispatch(addPeriod(period)), {
      pending: 'Period is being added ...',
      success: 'Period is added !',
      error: 'An Error Occurred !',
    });
    setOpen(false);
    setPeriod({
      teacher_id: null,
      subject_id: null,
      class_id: null,
      period: null,
      day: null,
    });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <Iconify icon="eva:plus-fill" />
        Add New Period
      </DialogTitle>
      <DialogContent>
        <DialogContentText>Please fill up the form to add a new period.</DialogContentText>

        {scheduleData && (
          <>
            <FormControl fullWidth required style={{ marginTop: '10px' }}>
              <InputLabel id="teacher-select-label">Teacher</InputLabel>
              <Select
                labelId="teacher-select-label"
                id="teacher-select"
                label="teacher *"
                value={period.teacher_id}
                onChange={(e) => setPeriod({ ...period, teacher_id: e.target.value })}
              >
                {scheduleData.teachers &&
                  scheduleData.teachers.map((teacher) => (
                    <MenuItem key={teacher.teacher_id} value={teacher.teacher_id}>
                      {teacher.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>

            <FormControl fullWidth required style={{ marginTop: '10px' }}>
              <InputLabel id="subject-select-label">Subject</InputLabel>
              <Select
                labelId="subject-select-label"
                id="subject-select"
                label="subject *"
                value={period.subject_id}
                onChange={(e) => setPeriod({ ...period, subject_id: e.target.value })}
                disabled={!period.teacher_id}
              >
                {period.teacher_id &&
                  scheduleData.teachers
                    .find((teacher) => teacher.teacher_id === period.teacher_id)
                    ?.subjects.map((subject) => (
                      <MenuItem key={subject.id} value={subject.id}>
                        {subject.name}
                      </MenuItem>
                    ))}
              </Select>
            </FormControl>

            <FormControl fullWidth required style={{ marginTop: '10px' }}>
              <InputLabel id="class-select-label">Class</InputLabel>
              <Select
                labelId="class-select-label"
                id="class-select"
                label="class *"
                value={period.class_id}
                onChange={(e) => setPeriod({ ...period, class_id: e.target.value })}
              >
                {scheduleData.classrooms &&
                  scheduleData.classrooms.map((classroom) => (
                    <MenuItem key={classroom.id} value={classroom.id}>
                      {`${classroom.grade} / ${classroom.class_number}`}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>

            <FormControl fullWidth required style={{ marginTop: '10px' }}>
              <InputLabel id="period-select-label">Period</InputLabel>
              <Select
                labelId="period-select-label"
                id="period-select"
                label="period *"
                value={period.period}
                onChange={(e) => setPeriod({ ...period, period: e.target.value })}
              >
                {scheduleData.periods &&
                  scheduleData.periods.map((time) => (
                    <MenuItem key={time} value={time}>
                      {time}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>

            <FormControl fullWidth required style={{ marginTop: '10px' }}>
              <InputLabel id="day-select-label">Day</InputLabel>
              <Select
                labelId="day-select-label"
                id="day-select"
                label="day *"
                value={period.day}
                onChange={(e) => setPeriod({ ...period, day: e.target.value })}
              >
                {scheduleData.days &&
                  scheduleData.days.map((day) => (
                    <MenuItem key={day} value={day}>
                      {day}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleAdd}>Add</Button>
      </DialogActions>
    </Dialog>
  );
}

PeriodDialog.propTypes = {
  open: PropTypes.any,
  setOpen: PropTypes.func,
};
