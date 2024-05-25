import { t } from 'i18next';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import { addDepartment, getDepartments, updateDepartment } from 'src/api/departmentSlice';

import Iconify from 'src/components/iconify';

export default function DepartmentDialog({ open, setOpen, updateData, setUpdateData }) {
  const dispatch = useDispatch();
  const [deptData, setDeptData] = useState({ name: '' });

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    toast.promise(dispatch(addDepartment(deptData)), {
      pending: t('departmentBeingAdded'),
      success: t('departmentAdded'),
      error: t('errorOccured'),
    });
    setOpen(false);
    setDeptData({ name: '' });
    dispatch(getDepartments());
  };

  const handleUpdate = () => {
    toast.promise(dispatch(updateDepartment(updateData)), {
      pending: t('departmentBeingUpdated'),
      success: t('departmentUpdated'),
      error: t('errorOccured'),
    });
    dispatch(getDepartments());
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <Iconify icon={`${updateData?.id ? 'bi:pencil' : 'eva:plus-fill'}`} />
        {updateData?.id ? t('upateDepartment') : t('AddDepartment')}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {updateData?.id ? t('fillUpdateDepartment') : t('fillAddDepartment')}
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label={t('name')}
          type="text"
          value={updateData?.name ? updateData.name : deptData.name}
          onChange={
            updateData?.id
              ? (e) => setUpdateData({ ...updateData, name: e.target.value })
              : (e) => setDeptData({ ...deptData, name: e.target.value })
          }
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{t('discard')}</Button>
        <Button onClick={updateData?.id ? handleUpdate : handleAdd}>
          {updateData?.id ? t('edit') : t('save')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

DepartmentDialog.propTypes = {
  open: PropTypes.any,
  setOpen: PropTypes.func,
  updateData: PropTypes.any,
  setUpdateData: PropTypes.func,
};
