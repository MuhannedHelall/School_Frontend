import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import { EmployeeView } from 'src/sections/admin/employee/view';

// ----------------------------------------------------------------------

export default function DepartmentId() {
  const { id } = useParams();
  return (
    <>
      <Helmet>
        <title> Departments | {id} </title>
      </Helmet>

      <EmployeeView />
    </>
  );
}
