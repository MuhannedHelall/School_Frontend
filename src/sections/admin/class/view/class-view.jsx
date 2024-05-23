import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';

import { uploadFile, getClasses, downloadFile } from 'src/api/classSlice';

import { CardView } from 'src/sections/blog/view';

import ClassCard from '../class-card';
import ClassDialog from '../class-dialog';
import AttachDialog from '../attach-dialog';

// ----------------------------------------------------------------------

export default function ClassView() {
  const dispatch = useDispatch();
  const classes = useSelector((state) => state.class);

  useEffect(() => {
    if (classes.data.length < 1) dispatch(getClasses());
  }, [dispatch, classes.data.length]);

  const handleFileUpload = (file) => {
    toast.promise(dispatch(uploadFile(file)), {
      pending: 'File is being uploaded ...',
      success: {
        render({ data }) {
          dispatch(getClasses());
          return data.payload[1];
        },
      },
      error: 'An error occured !',
    });
  };

  const handleFileDownload = () => {
    dispatch(downloadFile());
  };

  return (
    <CardView
      title="Classes"
      items={classes}
      onUpload={handleFileUpload}
      onDownload={handleFileDownload}
      Card={ClassCard}
      CardDialog={ClassDialog}
      CardSecondDialog={AttachDialog}
    />
  );
}
