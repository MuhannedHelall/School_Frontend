import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import { addSubject, getSubjects, updateSubject } from 'src/api/subjectSlice';

import Iconify from 'src/components/iconify';

export default function SubjectDialog({ open, setOpen, updateData, setUpdateData }) {
  const dispatch = useDispatch();
  const [subData, setSubData] = useState({ name: '' });
  const { t } = useTranslation();

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    toast.promise(dispatch(addSubject(subData)), {
      pending: t('subjectBeingAdded'),
      success: t('subjectAdded'),
      error: t('errorOccured'),
    });
    setOpen(false);
    setSubData({ name: '' });
    dispatch(getSubjects());
  };

  const handleUpdate = () => {
    toast.promise(dispatch(updateSubject(updateData)), {
      pending: t('subjectBeingUpdated'),
      success: t('subjectUpdated'),
      error: t('errorOccured'),
    });
    dispatch(getSubjects());
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <Iconify icon={`${updateData?.id ? 'bi:pencil' : 'eva:plus-fill'}`} />
        {updateData?.id ? t('updateSubject') : t('addSubject')}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {updateData?.id ? t('fillUpdateSubject') : t('fillAddSubject')}
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Name"
          type="text"
          value={updateData?.name ? updateData.name : subData.name}
          onChange={
            updateData?.id
              ? (e) => setUpdateData({ ...updateData, name: e.target.value })
              : (e) => setSubData({ ...subData, name: e.target.value })
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

SubjectDialog.propTypes = {
  open: PropTypes.any,
  setOpen: PropTypes.func,
  updateData: PropTypes.any,
  setUpdateData: PropTypes.func,
};
