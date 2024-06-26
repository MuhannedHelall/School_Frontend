import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import { alpha } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { goHome } from 'src/utils/utilies';

import route from 'src/routes';
import { logout } from 'src/api/authSlice';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(null);
  const { t } = useTranslation();
  const user = useSelector((state) => state.auth);
  const lang = useSelector((state) => state.language.value);

  const MENU_OPTIONS = {
    en: [
      {
        label: 'Home',
        icon: 'eva:home-fill',
        action: () => handleHome(),
      },
      {
        label: 'Edit Profile',
        icon: 'eva:settings-2-fill',
        action: () => navigate(route.editProfile),
      },
    ],
    ar: [
      {
        label: 'الصفحة الرئيسية',
        icon: 'eva:home-fill',
        action: () => handleHome(),
      },
      {
        label: 'تعديل الملف',
        icon: 'eva:settings-2-fill',
        action: () => navigate(route.editProfile),
      },
    ],
  };

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleHome = () => {
    navigate(goHome(user?.data?.role));
    handleClose();
  };

  const handleLogout = async () => {
    toast.promise(dispatch(logout()), {
      pending: {
        render() {
          return 'Logging out ...';
        },
      },
      success: {
        render({ data }) {
          localStorage.removeItem('token');
          localStorage.removeItem('role');
          localStorage.removeItem('user');
          navigate('/login');
          return data.payload.message;
        },
      },
      error: {
        render({ data }) {
          return data.error.message;
        },
      },
    });
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar
          src={
            user.data?.user?.avatar_url ||
            `/assets/images/avatars/avatar_${
              user?.data?.user?.id || user.data.user_id || 1 % 25
            }.jpg`
          }
          alt={user.data.user?.name}
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        >
          {user.data.user?.name.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1,
            ml: 0.75,
            width: 200,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2 }}>
          <Typography variant="subtitle2" noWrap>
            {user.data.user?.name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user.data.user?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {lang === 'ar'
          ? MENU_OPTIONS.ar.map((option) => (
              <MenuItem key={option.label} onClick={option.action}>
                {option.label}
              </MenuItem>
            ))
          : MENU_OPTIONS.en.map((option) => (
              <MenuItem key={option.label} onClick={option.action}>
                {option.label}
              </MenuItem>
            ))}

        <Divider sx={{ borderStyle: 'dashed', m: 0 }} />

        <MenuItem
          disableRipple
          disableTouchRipple
          onClick={handleLogout}
          sx={{ typography: 'body2', color: 'error.main', py: 1.5 }}
        >
          {t('logout')}
        </MenuItem>
      </Popover>
    </>
  );
}
