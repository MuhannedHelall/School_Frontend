import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import { Button } from '@mui/material';

import Iconify from '../iconify';

function BackButton({ to = '', color = 'primary' }) {
  const navigate = useNavigate();

  return (
    <Button
      variant="contained"
      color={color}
      sx={{ width: '32px', height: '32px', fontSize: '20px' }}
      onClick={() => navigate(to)}
    >
      <Iconify icon="fluent:arrow-left-12-filled" />
    </Button>
  );
}

BackButton.propTypes = {
  to: PropTypes.any,
  color: PropTypes.any,
};

export default BackButton;
