import { Helmet } from 'react-helmet-async';

import { SubjectView } from 'src/sections/admin/subject/view';

function SubjectsPage() {
  return (
    <>
      <Helmet>
        <title>Subjects</title>
      </Helmet>

      <SubjectView />
    </>
  );
}

export default SubjectsPage;
