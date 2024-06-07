import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import Radio from '@mui/material/Radio';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
// import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FormControlLabel from '@mui/material/FormControlLabel';
import DialogContentText from '@mui/material/DialogContentText';

import { addLecture, getLectures, updateLecture, addLectureWithVideo } from 'src/api/lecturesSlice';

import Iconify from 'src/components/iconify';

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
export default function LectureDialog({ open, setOpen, updateData, setUpdateData }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { id } = useParams();
  const user = useSelector((state) => state.auth.data);
  const [label, setLabel] = useState('url');
  const [lectureData, setLectureData] = useState({
    title: '',
    url: '',
    description: '',
    video: null,
    employee_id: user.id,
    subject_id: id,
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setLectureData({ ...lectureData, video: file });
  };

  const handleAdd = () => {
    if (label === 'url') {
      setLectureData((prev) => ({ ...prev, video: null }));
      toast.promise(dispatch(addLecture(lectureData)), {
        pending: 'Lecture is being added ...',
        success: 'Lecture added successfully !',
        error: 'An Error Occured !',
      });
    } else {
      setLectureData((prev) => ({ ...prev, url: null }));
      const formData = new FormData();
      formData.append('employee_id', lectureData.employee_id);
      formData.append('subject_id', lectureData.subject_id);
      formData.append('title', lectureData.title);
      formData.append('description', lectureData.description);
      formData.append('video', lectureData.video);
      toast.promise(dispatch(addLectureWithVideo(formData)), {
        pending: 'Lecture is being added ...',
        success: 'Lecture added successfully !',
        error: 'An Error Occured !',
      });
    }
    setOpen(false);
    setLectureData({
      title: '',
      url: '',
      video: '',
      description: '',
      employee_id: '',
      subject_id: '',
    });
    dispatch(getLectures(id));
  };

  const handleUpdate = () => {
    toast.promise(
      dispatch(updateLecture({ ...updateData, employee_id: user.id, subject_id: id })),
      {
        pending: 'Lecture is being updated ...',
        success: 'Lecture updated successfully !',
        error: 'An Error Occured !',
      }
    );
    dispatch(getLectures(id));
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <Iconify icon={`${updateData?.id ? 'bi:pencil' : 'eva:plus-fill'}`} />
        {/* // 'Update Current Lecture' */}
        {updateData?.id ? t('updateCurrentLecture') : t('addNewLecture')}
        {/* // 'Add a new Lecture' */}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {/* 'Please fill up the form to update the current lecture' */}
          {updateData?.id ? t('fillFormToUpdateLecture') : t('fillFormToAddLecture')}
          {/* 'Please fill up the form to add a new lecture' */}
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label={t('title')}
          type="text"
          value={updateData?.title ? updateData.title : lectureData.title}
          onChange={
            updateData?.id
              ? (e) => setUpdateData({ ...updateData, title: e.target.value })
              : (e) => setLectureData({ ...lectureData, title: e.target.value })
          }
          fullWidth
        />
        <TextField
          margin="dense"
          label={t('description')}
          type="text"
          value={updateData?.description ? updateData.description : lectureData.description}
          onChange={
            updateData?.id
              ? (e) => setUpdateData({ ...updateData, description: e.target.value })
              : (e) => setLectureData({ ...lectureData, description: e.target.value })
          }
          fullWidth
        />
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue={label}
            name="radio-buttons-group"
            onChange={(e) => setLabel(e.target.value)}
            row
          >
            <FormControlLabel value="url" control={<Radio />} label={t('url')} />
            <FormControlLabel value="video" control={<Radio />} label={t('video')} />
          </RadioGroup>
        </FormControl>
        {label === 'url' ? (
          <TextField
            margin="dense"
            label={t('url')}
            type="text"
            value={updateData?.url ? updateData.url : lectureData.url}
            onChange={
              updateData?.id
                ? (e) => setUpdateData({ ...updateData, url: e.target.value })
                : (e) => setLectureData({ ...lectureData, url: e.target.value })
            }
            fullWidth
          />
        ) : (
          <Button
            component="label"
            variant="contained"
            tabIndex={-1}
            size="large"
            sx={{ display: 'block', textAlign: 'center' }}
          >
            {t('uploadFile')}
            <VisuallyHiddenInput type="file" onChange={handleFileChange} />
          </Button>
        )}
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

LectureDialog.propTypes = {
  open: PropTypes.any,
  setOpen: PropTypes.func,
  updateData: PropTypes.any,
  setUpdateData: PropTypes.func,
};
