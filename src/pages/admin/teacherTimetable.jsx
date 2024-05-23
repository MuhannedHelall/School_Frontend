import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getTeacherTable } from 'src/api/timeSlice';

import ScheduleView from 'src/sections/teacher/schedule/view/schedule-view';

function TeacherTimetable() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const scheduleDataFromAPI = useSelector((state) => state.time);

  useEffect(() => {
    dispatch(getTeacherTable(id));
  }, [dispatch, id]);
  return (
    <>
      <Helmet>
        <title>Schedule</title>
      </Helmet>

      <ScheduleView title="Teacher" data={scheduleDataFromAPI} />
    </>
  );
}

export default TeacherTimetable;
