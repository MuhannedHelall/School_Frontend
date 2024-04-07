import { Helmet } from 'react-helmet-async';

import { SubjectsView } from 'src/sections/teacher/subjects';

function SubjectsPage() {
  return (
    <>
      <Helmet>
        <title>Subjects</title>
      </Helmet>

      <SubjectsView />
    </>
  );
}

export default SubjectsPage;
