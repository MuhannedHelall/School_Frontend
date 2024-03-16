import React from 'react';
import { useSelector } from 'react-redux';

import { Box, Badge, Avatar, Typography } from '@mui/material';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function EditProfileView() {
  const user = useSelector((state) => state.auth.data);
  return (
    <Box>
      <Typography variant="h3" gutterBottom>
        Edit Profile
      </Typography>

      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        badgeContent={
          <Box
            onClick={() => console.log('clicked')}
            sx={{
              background: '#00CCFF',
              color: '#fff',
              width: '32px',
              height: '32px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '100px',
              '&:hover': {
                background: '#35D7FF',
                cursor: 'pointer',
              },
            }}
          >
            <Iconify icon="bx:pencil" />
          </Box>
        }
      >
        <Avatar
          alt={user.name}
          src={`/assets/images/avatars/avatar_${user.id % 25}.jpg`}
          sx={{ width: 140, height: 140, border: '2px solid #87CEEB' }}
        />
      </Badge>
    </Box>
  );
}
