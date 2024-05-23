import { toast } from 'react-toastify';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import { addPeriod, getTableData } from 'src/api/timeSlice';

import { Loader } from 'src/sections/loader';

// import PeriodDialog from '../period-dialog';

function TimeTableView() {
  //   const [open, setOpen] = useState(false);
  //   const handleClose = () => {
  //     setOpen(false);
  //   };
  const dispatch = useDispatch();
  const scheduleData = useSelector((state) => state.time);
  const [period, setPeriod] = useState({
    teacher_id: null,
    subject_id: null,
    class_id: null,
    period: null,
    day: null,
  });

  const handleAdd = () => {
    toast.promise(dispatch(addPeriod(period)), {
      pending: 'Period is being added ...',
      success: 'Period is added !',
      error: 'An Error Occured !',
    });
    setPeriod({
      teacher_id: null,
      subject_id: null,
      class_id: null,
      period: null,
      day: null,
    });
  };

  useEffect(() => {
    dispatch(getTableData());
  }, [dispatch]);

  return (
    <Container>
      <h1>Timetable View</h1>
      {/* <button type="button" onClick={() => setOpen(true)}>
        Click me
      </button>
      <PeriodDialog open={open} setOpen={setOpen} /> */}

      {scheduleData.loading ? (
        <Loader sx="mt-5 pt-5" />
      ) : (
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
              {scheduleData.data.teachers &&
                scheduleData.data.teachers.map((teacher) => (
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
                scheduleData.data.teachers
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
              {scheduleData.data.classrooms &&
                scheduleData.data.classrooms.map((classroom) => (
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
              {scheduleData.data.periods &&
                scheduleData.data.periods.map((time) => (
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
              {scheduleData.data.days &&
                scheduleData.data.days.map((day) => (
                  <MenuItem key={day} value={day}>
                    {day}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

          <Box>
            <Button variant="outlined" className="mt-3" onClick={handleAdd}>
              Add
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
}

export default TimeTableView;
