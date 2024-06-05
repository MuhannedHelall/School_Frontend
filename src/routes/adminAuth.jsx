import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

import route from 'src/routes';

const AdminAuth = ({ children }) => {
  if (localStorage.getItem('role') === 'admin' || localStorage.getItem('role') === 'superAdmin')
    return children;
  return <Navigate to={route.landing} />;
};

AdminAuth.propTypes = {
  children: PropTypes.object,
};

export default AdminAuth;
