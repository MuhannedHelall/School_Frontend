import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

import route from 'src/routes';

const SuperAuth = ({ children }) => {
  if (localStorage.getItem('role') === 'superAdmin') return children;
  return <Navigate to={route.landing} />;
};

SuperAuth.propTypes = {
  children: PropTypes.object,
};

export default SuperAuth;
