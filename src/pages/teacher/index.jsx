import { Helmet } from 'react-helmet-async';

import { AppView } from 'src/sections/teacher/overview/view';

function TeacherIndex() {
  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>

      <AppView />
    </>
  );
}

export default TeacherIndex;
