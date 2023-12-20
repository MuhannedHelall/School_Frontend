import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';

import Nav from './nav';
import Main from './main';
import Header from './header';

// ----------------------------------------------------------------------

export default function DashboardLayout({ children }) {
  const navigate = useNavigate();

  const TOKEN = localStorage.getItem('token');
  const [openNav, setOpenNav] = useState(false);
  const lang = useSelector((state) => state.language);

  useEffect(() => {
    if (!TOKEN || TOKEN === undefined) navigate('/login');
  }, [TOKEN, navigate]);

  return (
    <Box sx={{ direction: lang.direction }}>
      <Header onOpenNav={() => setOpenNav(true)} />

      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} />

        <Main>{children}</Main>
      </Box>
    </Box>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
};
