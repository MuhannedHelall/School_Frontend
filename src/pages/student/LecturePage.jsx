import { Helmet } from 'react-helmet-async';

import { LectureView } from 'src/sections/teacher/lecture/view';

function LecturePage() {
  return (
    <>
      <Helmet>
        <title>Lecture</title>
      </Helmet>

      <LectureView />
    </>
  );
}

export default LecturePage;
