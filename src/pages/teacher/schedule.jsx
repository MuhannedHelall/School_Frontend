import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';

import { getTeacherTable } from 'src/api/timeSlice';

import ScheduleView from 'src/sections/teacher/schedule/view/schedule-view';

function SchedulePage() {
  const dispatch = useDispatch();

  const scheduleDataFromAPI = useSelector((state) => state.time);
  const user = useSelector((state) => state.auth.data);

  useEffect(() => {
    dispatch(getTeacherTable(user?.id));
  }, [dispatch, user?.id]);

  return (
    <>
      <Helmet>
        <title>Schedule</title>
      </Helmet>

      <ScheduleView title="Teacher" data={scheduleDataFromAPI} />
    </>
  );
}

export default SchedulePage;
