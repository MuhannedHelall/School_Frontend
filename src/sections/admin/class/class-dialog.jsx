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

import { addClass, getClasses, updateClass } from 'src/api/classSlice';

import Iconify from 'src/components/iconify';

export default function ClassDialog({ open, setOpen, updateData, setUpdateData }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [classData, setClassData] = useState({ class_number: '', grade: '' });

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    toast.promise(dispatch(addClass(classData)), {
      pending: t('classBeingAdded'),
      success: t('classAdded'),
      error: t('errorOccured'),
    });
    setOpen(false);
    setClassData({ class_number: '', grade: '' });
    dispatch(getClasses());
  };

  const handleUpdate = () => {
    toast.promise(dispatch(updateClass(updateData)), {
      pending: t('classBeingUpdated'),
      success: t('classUpdated'),
      error: t('errorOccured'),
    });
    dispatch(getClasses());
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <Iconify icon={`${updateData?.id ? 'bi:pencil' : 'eva:plus-fill'}`} />
        {updateData?.id ? t('updateClass') : t('addClass')}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {updateData?.id ? t('fillUpdateClass') : t('fillAddClass')}
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label={t('grade')}
          type="text"
          value={updateData?.grade ? updateData.grade : classData.grade}
          onChange={
            updateData?.id
              ? (e) => setUpdateData({ ...updateData, grade: e.target.value })
              : (e) => setClassData({ ...classData, grade: e.target.value })
          }
          fullWidth
        />
        <TextField
          margin="dense"
          label={t('classNumber')}
          type="text"
          value={updateData?.class_number ? updateData.class_number : classData.class_number}
          onChange={
            updateData?.id
              ? (e) => setUpdateData({ ...updateData, class_number: e.target.value })
              : (e) => setClassData({ ...classData, class_number: e.target.value })
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

ClassDialog.propTypes = {
  open: PropTypes.any,
  setOpen: PropTypes.func,
  updateData: PropTypes.any,
  setUpdateData: PropTypes.func,
};
