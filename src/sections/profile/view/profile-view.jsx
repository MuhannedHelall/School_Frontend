import React from 'react';
import PropTypes from 'prop-types';

import { Badge, Avatar } from '@mui/material';

import 'src/sections/editProfile/css/edit.css';

function ProfileView({ user }) {
  const { id, avatarUrl, name, email, role, userType, phone, address } = user;

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
                      <h3>Profile</h3>
                      <div className="photo">
                        <Badge
                          overlap="circular"
                          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        >
                          <Avatar
                            alt={name}
                            src={avatarUrl || `/assets/images/avatars/avatar_${id % 25}.jpg`}
                            sx={{ width: 140, height: 140, border: '2px solid #87CEEB' }}
                          />
                        </Badge>
                      </div>
                    </div>
                    <ul className="nav nav-tabs">
                      <li className="nav-item">
                        <button type="button" className="nav-link active">
                          Settings
                        </button>
                      </li>
                    </ul>
                    <div className="tab-content pt-3">
                      <div className="tab-pane active">
                        <form className="form">
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
                                        value={name}
                                        disabled
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
                                        value={userType?.toUpperCase() || role?.toUpperCase()}
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
                                        value={email}
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
                                    <label className="w-100" htmlFor="phoneNumber">
                                      Contacts Number
                                      <input
                                        id="phoneNumber"
                                        className="form-control"
                                        type="text"
                                        placeholder="661-724-7734"
                                        value={phone}
                                        disabled
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
                                        value={address}
                                        disabled
                                      />
                                    </label>
                                  </div>
                                </div>
                              </div>
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
ProfileView.propTypes = {
  user: PropTypes.any,
};
export default ProfileView;
