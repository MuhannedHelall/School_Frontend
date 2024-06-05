import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';

import { getClassTable } from 'src/api/timeSlice';

import ScheduleView from 'src/sections/teacher/schedule/view/schedule-view';

function SchedulePage() {
  const dispatch = useDispatch();

  const scheduleDataFromAPI = useSelector((state) => state.time);
  const user = useSelector((state) => state.auth.data);

  useEffect(() => {
    dispatch(getClassTable(user.class?.id));
  }, [dispatch, user.class?.id]);

  return (
    <>
      <Helmet>
        <title>Schedule</title>
      </Helmet>

      <ScheduleView title="Student" data={scheduleDataFromAPI} />
    </>
  );
}

export default SchedulePage;
