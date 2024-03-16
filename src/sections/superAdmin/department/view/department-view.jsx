import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';

import { uploadFile, downloadFile, getDepartments } from 'src/api/departmentSlice';

import { CardView } from 'src/sections/blog/view';

import DepartmentCard from '../department-card';
import DepartmentDialog from '../department-dialog';

// ----------------------------------------------------------------------

export default function DepartmentView() {
  const dispatch = useDispatch();
  const depts = useSelector((state) => state.department);

  useEffect(() => {
    if (depts.data.length < 1) dispatch(getDepartments());
  }, [dispatch, depts.data.length]);

  const handleFileUpload = (file) => {
    toast.promise(dispatch(uploadFile(file)), {
      pending: 'File is being uploaded ...',
      success: {
        render({ data }) {
          dispatch(getDepartments());
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
      title="Departments"
      items={depts}
      onUpload={handleFileUpload}
      onDownload={handleFileDownload}
      Card={DepartmentCard}
      CardDialog={DepartmentDialog}
    />
  );
}
