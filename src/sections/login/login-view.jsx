import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
// import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
// import Alert from '@mui/material/Alert';
// import Button from '@mui/material/Button';
// import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
// import AlertTitle from '@mui/material/AlertTitle';
// import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
// import FormControl from '@mui/material/FormControl';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';

import { goHome } from 'src/utils/utilies';

import { login } from 'src/api/authSlice';
import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

import { CameraCapture } from '../camera';

// ----------------------------------------------------------------------

export default function LoginView() {
  const theme = useTheme();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginMethod, setLoginMethod] = useState('email');
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const { data, error, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate(goHome(data.role));
    }
  }, [navigate, data.role]);

  useEffect(() => {
    toast.error(error);
  }, [error]);

  const validateForm = () => {
    const errs = {};

    // Validate email
    if (!loginData.email.trim()) {
      errs.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
      errs.email = 'Invalid email address';
    }

    // Validate password
    if (!loginData.password.trim()) {
      errs.password = 'Password is required';
    }

    setErrors(() => errs);
    return Object.keys(errs).length === 0; // Return true if there are no errors
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const res = await dispatch(login(loginData));
      if (res.meta.requestStatus === 'fulfilled') {
        navigate(goHome(res.payload.user.role));
      } else if (res.meta.requestStatus === 'rejected') {
        toast.error(error);
      }
    }
  };

  const renderForm = (
    <Box component="form">
      <Stack spacing={3} my={3}>
        <TextField
          value={loginData.email}
          onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
          name="email"
          label="Email address"
          type="email"
          error={errors.email}
          helperText={errors.email}
        />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={loginData.password}
          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
          error={errors.password}
          helperText={errors.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      {/* <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack> */}

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleLogin}
        loading={loading}
      >
        Login
      </LoadingButton>
    </Box>
  );

  //   const renderMethodsOfLogin = (
  //     <>
  //       <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
  //         Don’t have an account?
  //         <Link variant="subtitle2" sx={{ ml: 0.5 }}>
  //           Get started
  //         </Link>
  //       </Typography>

  //       <Stack direction="row" spacing={2}>
  //         <Button
  //           fullWidth
  //           size="large"
  //           color="inherit"
  //           variant="outlined"
  //           sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
  //         >
  //           <Iconify icon="eva:google-fill" color="#DF3E30" />
  //         </Button>

  //         <Button
  //           fullWidth
  //           size="large"
  //           color="inherit"
  //           variant="outlined"
  //           sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
  //         >
  //           <Iconify icon="eva:facebook-fill" color="#1877F2" />
  //         </Button>

  //         <Button
  //           fullWidth
  //           size="large"
  //           color="inherit"
  //           variant="outlined"
  //           sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
  //         >
  //           <Iconify icon="eva:twitter-fill" color="#1C9CEA" />
  //         </Button>
  //       </Stack>
  //     </>
  //   );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Sign in to Eduplat !</Typography>

          {/* <FormControl> */}
          {/* <FormLabel id="login-method">Login Method:</FormLabel> */}
          <RadioGroup
            row
            aria-labelledby="login-method"
            name="login-method-group"
            value={loginMethod}
            onChange={(e) => setLoginMethod(e.target.value)}
            sx={{ display: 'flex', justifyContent: 'space-evenly' }}
          >
            <FormControlLabel value="email" control={<Radio />} label="Email" />
            <FormControlLabel value="camera" control={<Radio />} label="Camera" />
          </RadioGroup>
          {/* </FormControl> */}

          {loginMethod === 'camera' ? <CameraCapture /> : renderForm}

          {/* <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              OR
            </Typography>
          </Divider> */}
        </Card>
      </Stack>
    </Box>
  );
}
