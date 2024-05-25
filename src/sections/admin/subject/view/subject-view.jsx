import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

// import { uploadFile, downloadFile, getDepartments } from 'src/api/departmentSlice';
import { uploadFile, getSubjects, downloadFile } from 'src/api/subjectSlice';

import { CardView } from 'src/sections/blog/view';

import SubjectCard from '../subject-card';
import SubjectDialog from '../subject-dialog';

// ----------------------------------------------------------------------

export default function SubjectView() {
  const dispatch = useDispatch();
  const subjects = useSelector((state) => state.subject);
  const { t } = useTranslation();

  useEffect(() => {
    if (subjects.data.length < 1) dispatch(getSubjects());
  }, [dispatch, subjects.data.length]);

  const handleFileUpload = (file) => {
    toast.promise(dispatch(uploadFile(file)), {
      pending: t('fileBeingUploaded'),
      success: {
        render({ data }) {
          dispatch(getSubjects());
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
      title={t('subjects')}
      items={subjects}
      onUpload={handleFileUpload}
      onDownload={handleFileDownload}
      Card={SubjectCard}
      CardDialog={SubjectDialog}
    />
  );
}
