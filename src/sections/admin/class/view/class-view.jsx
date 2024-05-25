import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();

  useEffect(() => {
    if (classes.data.length < 1) dispatch(getClasses());
  }, [dispatch, classes.data.length]);

  const handleFileUpload = (file) => {
    toast.promise(dispatch(uploadFile(file)), {
      pending: t('fileBeingUploaded'),
      success: {
        render({ data }) {
          dispatch(getClasses());
          return data.payload[1];
        },
      },
      error: t('errorOccured'),
    });
  };

  const handleFileDownload = () => {
    dispatch(downloadFile());
  };

  return (
    <CardView
      title={t('classes')}
      items={classes}
      onUpload={handleFileUpload}
      onDownload={handleFileDownload}
      Card={ClassCard}
      CardDialog={ClassDialog}
      CardSecondDialog={AttachDialog}
    />
  );
}
