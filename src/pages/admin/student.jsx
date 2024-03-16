import { Helmet } from 'react-helmet-async';

import StudentView from 'src/sections/admin/student/view/student-view';

// -----------------------------------------------------------------------

function StudentsPage() {
  return (
    <>
      <Helmet>
        <title>Students</title>
      </Helmet>

      <StudentView />
    </>
  );
}

export default StudentsPage;
