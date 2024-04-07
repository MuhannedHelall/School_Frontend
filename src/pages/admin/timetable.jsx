import { Helmet } from 'react-helmet-async';

import { TimeTableView } from 'src/sections/admin/timetable/view';

function TimeTablePage() {
  return (
    <>
      <Helmet>
        <title>Timetable</title>
      </Helmet>

      <TimeTableView />
    </>
  );
}

export default TimeTablePage;
