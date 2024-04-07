import { Helmet } from 'react-helmet-async';

import { SubjectGradesView } from 'src/sections/teacher/subjectsGrades/view';

// ----------------------------------------------------------------------

export default function SubjectGrade() {
  return (
    <>
      <Helmet>
        <title> Grades </title>
      </Helmet>

      <SubjectGradesView />
    </>
  );
}
