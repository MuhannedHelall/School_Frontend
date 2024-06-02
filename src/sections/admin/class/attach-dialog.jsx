import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import {
  getSubjects,
  attachSubject,
  detachSubject,
  getSubjectsForClass,
} from 'src/api/subjectSlice';

import Iconify from 'src/components/iconify';

import { Loader } from 'src/sections/loader';

export default function AttachDialog({ open, setOpen, data }) {
  console.log(data);
  const id = data?.id || 0;
  const dispatch = useDispatch();
  const subjects = useSelector((state) => state.subject);
  const [classData, setClassData] = useState({ class_id: '', subject_id: '' });

  const handleClose = () => {
    setOpen({ ...open, state: false });
  };

  const handleAdd = () => {
    toast.promise(dispatch(attachSubject({ ...classData, class_id: data.grade })), {
      pending: 'Subject is being attached ...',
      success: 'Subject is attached successfully !',
      error: 'An Error Occured !',
    });
    setOpen({ state: false, delete: false });
    setClassData({ class_id: '', subject_id: '' });
  };

  const handleDelete = (sub_id) => {
    toast.promise(dispatch(detachSubject({ class_id: data.id, subject_id: sub_id })), {
      pending: 'Subject is being detached ...',
      success: 'Subject is detached successfully !',
      error: 'An Error Occured !',
    });
    setOpen(false);
    setClassData({ class_id: '', subject_id: '' });
  };

  useEffect(() => {
    if (open.delete) dispatch(getSubjectsForClass(id));
    else dispatch(getSubjects());
  }, [id, dispatch, open]);

  return (
    <Dialog open={open.state} onClose={handleClose} fullWidth>
      {open.delete ? (
        <>
          <DialogTitle style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Iconify icon="gala:remove" />
            Detach a Subject
          </DialogTitle>
          <DialogContent>
            {subjects.loading ? (
              <Loader />
            ) : (
              <>
                {subjects.data.length ? (
                  <>
                    <DialogContentText mb={2}>Please select subjects to detach.</DialogContentText>
                    {subjects.data.map((subject) => (
                      <Box key={subject.id} display="flex" justifyContent="space-between">
                        <h5>{subject?.name}</h5>
                        <Iconify
                          icon="gala:remove"
                          style={{ cursor: 'pointer' }}
                          onClick={() => handleDelete(subject.id)}
                        />
                      </Box>
                    ))}
                  </>
                ) : (
                  <Typography variant="h4" textAlign="center">
                    No subjcts attached !
                  </Typography>
                )}
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Done</Button>
          </DialogActions>
        </>
      ) : (
        <>
          <DialogTitle style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Iconify icon="eva:plus-fill" />
            Attach a new Subject
          </DialogTitle>
          <DialogContent>
            <DialogContentText>Please fill up the form to attach a new subject.</DialogContentText>
            <FormControl fullWidth required style={{ marginTop: '10px' }}>
              <InputLabel id="class-select-label">Subjects</InputLabel>
              <Select
                labelId="class-select-label"
                id="class-select"
                label="subjects *"
                value={classData.subject_id}
                onChange={(e) => setClassData({ ...classData, subject_id: e.target.value })}
              >
                {subjects.data.map((sub) => (
                  <MenuItem key={sub.id} value={sub.id}>
                    {sub.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleAdd}>Attach</Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}

AttachDialog.propTypes = {
  open: PropTypes.any,
  setOpen: PropTypes.func,
  data: PropTypes.any,
  //   setData: PropTypes.func,
};
