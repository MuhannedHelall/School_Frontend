import { Helmet } from 'react-helmet-async';

import { SubjectLecturesView } from 'src/sections/teacher/subjectsLectures/view';

function LecturesPage() {
  return (
    <>
      <Helmet>
        <title>Lectures</title>
      </Helmet>

      <SubjectLecturesView />
    </>
  );
}

export default LecturesPage;
