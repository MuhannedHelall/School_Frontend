import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

// ----------------------------------------------------------------------

export default function DepartmentId() {
  const { id } = useParams();
  return (
    <>
      <Helmet>
        <title> Departments | {id} </title>
      </Helmet>

      <h1>Hi</h1>
    </>
  );
}
