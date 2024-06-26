import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import Select from '@mui/material/Select';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import { addAdmin, getAdmins } from 'src/api/adminSlice';
import { getDepartments } from 'src/api/departmentSlice';

import Iconify from 'src/components/iconify';

export default function AdminAddDialog({ open, setOpen }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const departments = useSelector((state) => state.department.data);
  const [adminData, setAdminData] = useState({ name: '', email: '', department_id: '1' });

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    toast.promise(dispatch(addAdmin(adminData)), {
      pending: t('adminBeingAdded'),
      success: t('adminAdded'),
      error: t('errorOccured'),
    });
    dispatch(getDepartments());
    dispatch(getAdmins());
    setOpen(false);
    setAdminData({ name: '', email: '', department_id: '1' });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <Iconify icon="eva:plus-fill" />
        {t('addAdmin')}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{t('fillTheForm')}</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label={t('name')}
          type="text"
          value={adminData.name}
          onChange={(e) => setAdminData({ ...adminData, name: e.target.value })}
          fullWidth
        />
        <TextField
          margin="dense"
          label={t('email')}
          type="email"
          value={adminData.email}
          onChange={(e) => setAdminData({ ...adminData, email: e.target.value })}
          fullWidth
        />
        <FormControl fullWidth required style={{ marginTop: '10px' }}>
          <InputLabel id="department-select-label">{t('departments')}</InputLabel>
          <Select
            labelId="department-select-label"
            id="department-select"
            label="Department *"
            value={adminData.department_id}
            onChange={(e) => setAdminData({ ...adminData, department_id: e.target.value })}
          >
            {departments.map((dept) => (
              <MenuItem key={dept.id} value={dept.id}>
                {dept.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleAdd}>Add</Button>
      </DialogActions>
    </Dialog>
  );
}

AdminAddDialog.propTypes = {
  open: PropTypes.any,
  setOpen: PropTypes.func,
};
