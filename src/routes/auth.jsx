import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

const Auth = ({ children }) => {
  if (localStorage.getItem('token')) return children;
  return <Navigate to="/login" />;
};

Auth.propTypes = {
  children: PropTypes.object,
};

export default Auth;
