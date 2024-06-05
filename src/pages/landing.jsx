import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';

import route from 'src/routes';

import Iconify from 'src/components/iconify';

// import { LandingView } from 'src/sections/landing';

// ----------------------------------------------------------------------

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title> Schovators | Home </title>
      </Helmet>
      {/* <LandingView /> */}

      <Box height="90vh">
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              {/* <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton> */}
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Schovators
              </Typography>
              <Button color="inherit" onClick={() => navigate(route.notFound)}>
                About
              </Button>
              <Button color="inherit" onClick={() => navigate(route.login)}>
                Login
              </Button>
            </Toolbar>
          </AppBar>
        </Box>

        <Box height="inherit" display="flex" alignItems="center" justifyContent="center">
          <Box width="60%" textAlign="center">
            <Typography variant="h1">School Management System</Typography>
            <Typography variant="h2">Schovators</Typography>
            <Typography variant="body1">
              Schovators E-school (SMS) is an integrated management system with all the tools needed
              to manage private schools, students, and teachers, The system was designed in
              collaboration with thousands of education professionals, teachers, and administrative
              staff to provide the best technologies.
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              sx={{ marginTop: 2 }}
              onClick={() => navigate(route.login)}
            >
              Start <Iconify sx={{ marginLeft: 1 }} icon="fluent:arrow-right-12-filled" />
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
