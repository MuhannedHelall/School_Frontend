import { Helmet } from 'react-helmet-async';

import { DepartmentView } from 'src/sections/department/view';

// ----------------------------------------------------------------------

export default function DepartmentPage() {
  return (
    <>
      <Helmet>
        <title> Departments </title>
      </Helmet>

      <DepartmentView />
    </>
  );
}
