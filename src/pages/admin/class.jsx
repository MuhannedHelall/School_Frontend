import { Helmet } from 'react-helmet-async';

import { ClassView } from 'src/sections/admin/class/view';

function ClassesPage() {
  return (
    <>
      <Helmet>
        <title>Classes</title>
      </Helmet>

      <ClassView />
    </>
  );
}

export default ClassesPage;
