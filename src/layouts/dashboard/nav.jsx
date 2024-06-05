import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Avatar from '@mui/material/Avatar';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';

import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useResponsive } from 'src/hooks/use-responsive';

// import Logo from 'src/components/logo';
import Scrollbar from 'src/components/scrollbar';

import { NAV } from './config-layout';
import navConfig from './config-navigation';

// ----------------------------------------------------------------------

export default function Nav({ openNav, onCloseNav }) {
  const pathname = usePathname();
  const upLg = useResponsive('up', 'lg');
  const loginInfo = useSelector((state) => state.auth);

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderAccount = (
    <Box
      sx={{
        my: 3,
        mx: 2.5,
        py: 2,
        px: 2.5,
        display: 'flex',
        borderRadius: 1.5,
        alignItems: 'center',
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
      }}
    >
      <Avatar
        src={
          loginInfo.data?.user?.avatar_url ||
          `/assets/images/avatars/avatar_${
            loginInfo.data?.user?.id || loginInfo.data.user_id % 25
          }.jpg`
        }
        alt={loginInfo.data?.user?.name}
      >
        {loginInfo.data?.user?.name.charAt(0).toUpperCase()}
      </Avatar>

      <Box sx={{ ml: 2 }}>
        <Typography variant="subtitle2" textTransform="capitalize">
          {loginInfo.data?.user?.name}
        </Typography>

        <Typography variant="body2" textTransform="uppercase" sx={{ color: 'text.secondary' }}>
          {loginInfo.data?.role}
        </Typography>

        <Typography variant="caption">
          {loginInfo.data.role === 'student'
            ? `${loginInfo.data?.class?.grade}/${loginInfo.data?.class?.class_number}`
            : loginInfo.data?.department?.name}
        </Typography>
      </Box>
    </Box>
  );

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      {/* <Logo sx={{ mt: 3, ml: 4 }} /> */}
      <Typography variant="h4" className="mt-4 text-center">
        Schovators
      </Typography>

      {renderAccount}

      <RenderMenu />

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.WIDTH },
      }}
    >
      {upLg ? (
        <Box
          sx={{
            height: 1,
            position: 'fixed',
            width: NAV.WIDTH,
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          {renderContent}
        </Box>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.WIDTH,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

// ----------------------------------------------------------------------

function RenderMenu() {
  const user = useSelector((state) => state.auth.data);
  const lang = useSelector((state) => state.language.value);
  let navMenu = [];
  switch (user.role) {
    case 'superAdmin':
      if (lang === 'ar') navMenu = navConfig.super.ar;
      else navMenu = navConfig.super.en;
      break;
    case 'admin':
      if (user.department.id === 4) {
        if (lang === 'ar') navMenu = navConfig.admin.teacher.ar;
        else navMenu = navConfig.admin.teacher.en;
      } else if (user.department.id === 5) {
        if (lang === 'ar') navMenu = navConfig.admin.student.ar;
        else navMenu = navConfig.admin.student.en;
      } else {
        /* eslint-disable-next-line no-lonely-if */
        if (lang === 'ar') navMenu = navConfig.admin.employee.ar;
        else navMenu = navConfig.admin.employee.en;
      }
      break;
    case 'teacher':
      if (lang === 'ar') navMenu = navConfig.teacher.ar;
      else navMenu = navConfig.teacher.en;
      break;
    case 'student':
      if (lang === 'ar') navMenu = navConfig.student.ar;
      else navMenu = navConfig.student.en;
      break;
    default:
      navMenu = [];
  }
  return (
    <Stack component="nav" spacing={0.5} sx={{ px: 2 }}>
      {navMenu.map((item) => (
        <NavItem key={item.title} item={item} />
      ))}
    </Stack>
  );
}

// ----------------------------------------------------------------------

function NavItem({ item }) {
  const pathname = usePathname();

  const active = item.path === pathname;

  return (
    <ListItemButton
      component={RouterLink}
      href={item.path}
      sx={{
        minHeight: 44,
        borderRadius: 0.75,
        typography: 'body2',
        color: 'text.secondary',
        textTransform: 'capitalize',
        fontWeight: 'fontWeightMedium',
        ...(active && {
          color: 'primary.main',
          fontWeight: 'fontWeightSemiBold',
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
          '&:hover': {
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
          },
        }),
      }}
    >
      <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
        {item.icon}
      </Box>

      <Box component="span">{item.title} </Box>
    </ListItemButton>
  );
}

NavItem.propTypes = {
  item: PropTypes.object,
};
