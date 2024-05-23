import { Helmet } from 'react-helmet-async';

import { SubjectLecturesView } from 'src/sections/teacher/subjectsLectures/view';

// ----------------------------------------------------------------------

export default function SubjectLecture() {
  return (
    <>
      <Helmet>
        <title> Lectures </title>
      </Helmet>

      <SubjectLecturesView />
    </>
  );
}
