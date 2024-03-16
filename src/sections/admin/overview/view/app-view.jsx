import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { getAdminDashboardData } from 'src/api/dashboardSlice';

import TeacherAdminOverview from '../teacher-admin-overview';
import StudentAdminOverview from '../student-admin-overview';
import EmployeeAdminOverview from '../employee-admin-overview';

// ----------------------------------------------------------------------

function ShowDashboard({ data, dept_id }) {
  switch (dept_id) {
    case 4:
      return <TeacherAdminOverview data={data} />;
    case 5:
      return <StudentAdminOverview data={data} />;
    default:
      return <EmployeeAdminOverview data={data} />;
  }
}

ShowDashboard.propTypes = {
  data: PropTypes.any,
  dept_id: PropTypes.any,
};

// ------------------------------------------------------------------------

export default function AppView() {
  const dispatch = useDispatch();
  const { data, error, loading } = useSelector((state) => state.dashboard);
  const user = useSelector((state) => state.auth.data);

  useEffect(() => {
    if (Object.keys(data).length < 1) dispatch(getAdminDashboardData());
  }, [dispatch, data]);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>

      {error &&
        toast.error(error, {
          toastId: error,
          position: 'bottom-right',
          autoClose: 20000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        })}

      {loading ? (
        <h1 style={{ textAlign: 'center', marginTop: '30vh' }}>Loading ...</h1>
      ) : (
        <ShowDashboard data={data} dept_id={user.department_id} />
      )}
    </Container>
  );
}
