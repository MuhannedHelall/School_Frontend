import { toast } from 'react-toastify';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { styled } from '@mui/material/styles';
import { Box, Badge, Avatar } from '@mui/material';

import { editProfile, uploadAvatar, changePassword } from 'src/api/authSlice';

import Iconify from 'src/components/iconify';

import './css/edit.css';

// ----------------------------------------------------------------------
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function EditProfileView() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.data);
  const [selected, setSelected] = useState(1);
  //   const [image, setImage] = useState(null);
  const [userData, setUserData] = useState({
    id: user?.user?.id,
    name: user?.user?.name || '',
    email: user?.user?.email || '',
    phone: user?.user?.phone || '',
    address: user?.user?.address || '',
  });
  const [userPassword, setUserPassword] = useState({
    id: user?.user?.id,
    current_password: '',
    new_password: '',
    confirmed_Password: '',
  });

  const handleEditUser = (e) => {
    e.preventDefault();
    toast.promise(dispatch(editProfile(userData)), {
      pending: `Profile is being updated ...`,
      success: `Profile is updated !`,
      error: `An Error Occured !`,
    });
  };

  const handleEditPassword = (e) => {
    e.preventDefault();
    if (userPassword.new_password === userPassword.confirmed_Password) {
      toast.promise(dispatch(changePassword(userPassword)), {
        pending: `Password is being updated ...`,
        success: `Password is updated !`,
        error: `An Error Occured !`,
      });
    }
  };

  const handleChange = (e) => {
    const form = new FormData();
    form.append('image', e.target.files[0]);
    toast.promise(dispatch(uploadAvatar({ id: user.user?.id, form })), {
      pending: `Avatar is being uploaded ...`,
      success: `Avatar is uploaded !`,
      error: `An Error Occured !`,
    });
  };

  return (
    <div className="container">
      <div className="row flex-lg-nowrap">
        <div className="col-12 col-lg-auto mb-3" style={{ width: '100px' }} />

        <div className="col">
          <div className="row">
            <div className="col mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="e-profile">
                    <div className="row">
                      <h3>Edit Profile</h3>
                      <div className="photo">
                        <Badge
                          overlap="circular"
                          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                          badgeContent={
                            <Box
                              component="label"
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
                              <VisuallyHiddenInput type="file" onChange={handleChange} />
                              <Iconify icon="bx:pencil" />
                            </Box>
                          }
                        >
                          <Avatar
                            alt={user.name}
                            /* eslint-disable no-unsafe-optional-chaining */
                            src={
                              user.user?.avatar_url ||
                              `/assets/images/avatars/avatar_${user?.user?.id % 25}.jpg`
                            }
                            /* eslint-enable no-unsafe-optional-chaining */
                            sx={{ width: 140, height: 140, border: '2px solid #87CEEB' }}
                          />
                        </Badge>
                      </div>
                    </div>
                    <ul className="nav nav-tabs">
                      <li className="nav-item">
                        <button
                          type="button"
                          className={`${selected === 1 && 'active'} nav-link`}
                          onClick={() => setSelected(1)}
                        >
                          Settings
                        </button>
                      </li>
                      <li className="nav-item">
                        <button
                          type="button"
                          className={`${selected === 2 && 'active'} nav-link`}
                          onClick={() => setSelected(2)}
                        >
                          Password
                        </button>
                      </li>
                    </ul>
                    <div className="tab-content pt-3">
                      <div className="tab-pane active">
                        {selected === 1 ? (
                          <form className="form" onSubmit={handleEditUser}>
                            <div className="row">
                              <div className="col">
                                <div className="row">
                                  <div className="col">
                                    <div className="form-group">
                                      <label htmlFor="fullName" className="w-100">
                                        Full Name
                                        <input
                                          id="fullName"
                                          className="form-control"
                                          type="text"
                                          value={userData.name}
                                          onChange={(e) =>
                                            setUserData({ ...userData, name: e.target.value })
                                          }
                                        />
                                      </label>
                                    </div>
                                  </div>
                                  <div className="col">
                                    <div className="form-group">
                                      <label htmlFor="userName" className="w-100">
                                        User Type
                                        <input
                                          id="userName"
                                          className="form-control"
                                          type="text"
                                          name="username"
                                          placeholder="rana.g"
                                          value={user?.role?.toUpperCase()}
                                          disabled
                                        />
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <br />
                                <div className="row">
                                  <div className="col">
                                    <div className="form-group">
                                      <label htmlFor="email" className="w-100">
                                        Email
                                        <input
                                          id="email"
                                          className="form-control"
                                          type="text"
                                          placeholder="user@example.com"
                                          value={userData.email}
                                          onChange={(e) =>
                                            setUserData({ ...userData, email: e.target.value })
                                          }
                                        />
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <br />
                                <div className="row">
                                  <div className="col">
                                    <div className="form-group">
                                      <label className="w-100" htmlFor="phoneNumber">
                                        Contacts Number
                                        <input
                                          id="phoneNumber"
                                          className="form-control"
                                          type="text"
                                          placeholder="661-724-7734"
                                          value={userData.phone}
                                          onChange={(e) =>
                                            setUserData({ ...userData, phone: e.target.value })
                                          }
                                        />
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <br />
                                <div className="row">
                                  <div className="col mb-3">
                                    <div className="form-group">
                                      <label className="w-100" htmlFor="address">
                                        Address
                                        <input
                                          id="address"
                                          className="form-control"
                                          type="text"
                                          placeholder="1368 Hayhurst Lane"
                                          value={userData.address}
                                          onChange={(e) =>
                                            setUserData({ ...userData, address: e.target.value })
                                          }
                                        />
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col d-flex justify-content-end">
                                <button className="btn btn-primary" type="submit">
                                  Save Changes
                                </button>
                              </div>
                            </div>
                          </form>
                        ) : (
                          <form className="form" onSubmit={handleEditPassword}>
                            <div className="row">
                              <div className="col-12 col-sm-6 mb-3">
                                <div className="mb-2">
                                  <b>Change Password</b>
                                </div>
                                <div className="row">
                                  <div className="col">
                                    <div className="form-group">
                                      <label className="w-100" htmlFor="curPass">
                                        Current Password
                                        <input
                                          id="curPass"
                                          className="form-control"
                                          type="password"
                                          placeholder="• • • • • • • • • • • • • • • • • • •"
                                          value={userPassword.current_password}
                                          onChange={(e) =>
                                            setUserPassword({
                                              ...userPassword,
                                              current_password: e.target.value,
                                            })
                                          }
                                        />
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col">
                                    <div className="form-group">
                                      <label className="w-100" htmlFor="newPass">
                                        New Password
                                        <input
                                          id="newPass"
                                          className="form-control"
                                          type="password"
                                          placeholder="• • • • • • • • • • • • • • • • • • •"
                                          value={userPassword.new_password}
                                          onChange={(e) =>
                                            setUserPassword({
                                              ...userPassword,
                                              new_password: e.target.value,
                                            })
                                          }
                                        />
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col">
                                    <div className="form-group">
                                      <label className="w-100" htmlFor="conPass">
                                        Confirm <span className="d-none d-xl-inline">Password</span>
                                        <input
                                          id="conPass"
                                          className="form-control"
                                          type="password"
                                          placeholder="• • • • • • • • • • • • • • • • • • •"
                                          value={userPassword.confirmed_Password}
                                          onChange={(e) =>
                                            setUserPassword({
                                              ...userPassword,
                                              confirmed_Password: e.target.value,
                                            })
                                          }
                                        />
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col d-flex justify-content-end">
                                <button className="btn btn-primary" type="submit">
                                  Save Changes
                                </button>
                              </div>
                            </div>
                          </form>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-3 mb-3" style={{ width: '100px' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
