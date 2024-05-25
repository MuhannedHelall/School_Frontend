import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

import { changeLanguage } from 'src/api/languageSlice';

// ----------------------------------------------------------------------

const LANGUAGES = [
  {
    value: 'en',
    label: 'English',
    icon: '/assets/icons/ic_flag_en.svg',
    direction: 'ltr',
  },
  {
    value: 'ar',
    label: 'العربية',
    icon: '/assets/icons/ic_flag_ar.svg',
    direction: 'rtl',
  },
];

// ----------------------------------------------------------------------

export default function LanguagePopover() {
  const dispatch = useDispatch();
  const LANG = useSelector((state) => state.language);
  const [open, setOpen] = useState(null);
  const { i18n } = useTranslation();

  const lang = LANGUAGES.filter((lan) => lan.value !== LANG.value);
  // const lang = LANGS;

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleLang = (val) => {
    handleClose();
    dispatch(changeLanguage(val));
    i18n.changeLanguage(val.value);
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          ...(open && {
            bgcolor: 'action.selected',
          }),
        }}
      >
        <img src={LANG.icon} alt={LANG.label} />
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
            width: 180,
          },
        }}
      >
        {lang.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === LANG.value}
            onClick={() => handleLang(option)}
            sx={{ typography: 'body2', py: 1 }}
          >
            <Box component="img" alt={option.label} src={option.icon} sx={{ width: 28, mr: 2 }} />

            {option.label}
          </MenuItem>
        ))}
      </Popover>
    </>
  );
}
