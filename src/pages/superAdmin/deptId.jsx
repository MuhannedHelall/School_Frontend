import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import { StudentView } from 'src/sections/admin/student/view';
import { EmployeeView } from 'src/sections/admin/employee/view';

// ----------------------------------------------------------------------

export default function DepartmentId() {
  const { id } = useParams();
  return (
    <>
      <Helmet>
        <title> Departments | {id} </title>
      </Helmet>

      {+id === 5 ? <StudentView /> : <EmployeeView />}
    </>
  );
}
