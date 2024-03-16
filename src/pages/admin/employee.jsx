import { Helmet } from 'react-helmet-async';

import { EmployeeView } from 'src/sections/admin/employee/view';

// -----------------------------------------------------------------------

function EmpsPage() {
  return (
    <>
      <Helmet>
        <title>Employees</title>
      </Helmet>

      <EmployeeView />
    </>
  );
}

export default EmpsPage;
