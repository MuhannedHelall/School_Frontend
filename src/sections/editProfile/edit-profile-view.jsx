import React from 'react';
import { useSelector } from 'react-redux';

import { Box, Badge, Avatar } from '@mui/material';

import Iconify from 'src/components/iconify';

import './css/edit.css';

// ----------------------------------------------------------------------

export default function EditProfileView() {
  const user = useSelector((state) => state.auth.data);
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
                            src={`/assets/images/avatars/avatar_${user.user_id % 25}.jpg`}
                            sx={{ width: 140, height: 140, border: '2px solid #87CEEB' }}
                          />
                        </Badge>
                      </div>
                    </div>
                    <ul className="nav nav-tabs">
                      <li className="nav-item">
                        <a href="" className="active nav-link">
                          Settings
                        </a>
                      </li>
                    </ul>
                    <div className="tab-content pt-3">
                      <div className="tab-pane active">
                        <form className="form" noValidate="">
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
                                        value={user?.user?.name}
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
                                        value={user.user.user_type}
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
                                      />
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col">
                                  <div className="form-group">
                                    <label className="w-100" htmlFor="city">
                                      City
                                      <input
                                        id="city"
                                        className="form-control"
                                        type="text"
                                        name="name"
                                        placeholder="Mcallen"
                                      />
                                    </label>
                                  </div>
                                </div>
                                <div className="col">
                                  <div className="form-group">
                                    <label className="w-100" htmlFor="State">
                                      State
                                      <input
                                        id="state"
                                        className="form-control"
                                        type="text"
                                        name="username"
                                        placeholder="New York"
                                      />
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <br />
                              <div className="row">
                                <div className="col">
                                  <div className="form-group">
                                    <label className="w-100" htmlFor="zip">
                                      Zip code
                                      <input
                                        id="zip"
                                        className="form-control"
                                        type="text"
                                        name="name"
                                        placeholder="11357"
                                      />
                                    </label>
                                  </div>
                                </div>
                                <div className="col">
                                  <div className="form-group">
                                    <label className="w-100" htmlFor="country">
                                      Country
                                      <input
                                        id="country"
                                        className="form-control"
                                        type="text"
                                        name="username"
                                        placeholder="United State"
                                      />
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <br />
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
                                        placeholder="••••••"
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
                                        placeholder="••••••"
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
                                        placeholder="••••••"
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
