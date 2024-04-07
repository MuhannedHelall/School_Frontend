import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import { addLecture, getLectures, updateLecture } from 'src/api/lecturesSlice';

import Iconify from 'src/components/iconify';

export default function LectureDialog({ open, setOpen, updateData, setUpdateData }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const user = useSelector((state) => state.auth.data);
  const [lectureData, setLectureData] = useState({
    title: '',
    url: '',
    description: '',
    employee_id: user.id,
    subject_id: id,
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    toast.promise(dispatch(addLecture(lectureData)), {
      pending: 'Lecture is being added ...',
      success: 'Lecture added successfully !',
      error: 'An Error Occured !',
    });
    setOpen(false);
    setLectureData({ title: '', url: '', description: '', employee_id: '', subject_id: '' });
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
        {updateData?.id ? 'Update Current' : 'Add a new'} Lecture
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please fill up the form to {updateData?.id ? 'update the current ' : 'add a new '}
          lecture.
        </DialogContentText>

        <TextField
          autoFocus
          margin="dense"
          label="Title"
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
          label="URL"
          type="text"
          value={updateData?.url ? updateData.url : lectureData.url}
          onChange={
            updateData?.id
              ? (e) => setUpdateData({ ...updateData, url: e.target.value })
              : (e) => setLectureData({ ...lectureData, url: e.target.value })
          }
          fullWidth
        />

        <TextField
          margin="dense"
          label="Description"
          type="text"
          value={updateData?.description ? updateData.description : lectureData.description}
          onChange={
            updateData?.id
              ? (e) => setUpdateData({ ...updateData, description: e.target.value })
              : (e) => setLectureData({ ...lectureData, description: e.target.value })
          }
          fullWidth
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={updateData?.id ? handleUpdate : handleAdd}>
          {updateData?.id ? 'Update' : 'Add'}
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
