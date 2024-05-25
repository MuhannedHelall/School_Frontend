import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

import { uploadFile, downloadFile, getDepartments } from 'src/api/departmentSlice';

import { CardView } from 'src/sections/blog/view';

import DepartmentCard from '../department-card';
import DepartmentDialog from '../department-dialog';

// ----------------------------------------------------------------------

export default function DepartmentView() {
  const dispatch = useDispatch();
  const depts = useSelector((state) => state.department);
  const { t } = useTranslation();

  useEffect(() => {
    if (depts.data.length < 1) dispatch(getDepartments());
  }, [dispatch, depts.data.length]);

  const handleFileUpload = (file) => {
    toast.promise(dispatch(uploadFile(file)), {
      pending: t('fileBeingUploaded'),
      success: {
        render({ data }) {
          dispatch(getDepartments());
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
      title={t('departments')}
      items={depts}
      onUpload={handleFileUpload}
      onDownload={handleFileDownload}
      Card={DepartmentCard}
      CardDialog={DepartmentDialog}
    />
  );
}
