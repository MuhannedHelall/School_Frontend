import { toast } from 'react-toastify';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getDepartments } from 'src/api/departmentSlice';
import { getAdmins, uploadFile, downloadFile } from 'src/api/adminSlice';

import { TableView } from 'src/sections/table/view';

import UserTableRow from '../admin-table-row';
import UserAddDialog from '../admin-add-dialog';

// ----------------------------------------------------------------------
const Title = 'Admins';
const Labels = [
  { id: 'name', label: 'Name' },
  { id: 'department', label: 'Department' },
  { id: 'status', label: 'Status' },
  { id: 'action', label: 'Action', align: 'center' },
];
// ----------------------------------------------------------------------

function AdminView() {
  const dispatch = useDispatch();
  const admins = useSelector((state) => state.admin);
  const departments = useSelector((state) => state.department.data);

  useEffect(() => {
    if (admins.data.length < 1) dispatch(getAdmins());
    if (departments.length < 1) dispatch(getDepartments());
  }, [dispatch]); // eslint-disable-line

  const handleDownload = () => {
    dispatch(downloadFile());
  };

  const handleUpload = (file) => {
    toast.promise(dispatch(uploadFile(file)), {
      pending: 'File is being uploaded ...',
      success: {
        render({ data }) {
          dispatch(getAdmins());
          // setOpenUploadDialog(false);
          return data.payload[1];
        },
      },
      error: 'An error occured !',
    });
  };

  return (
    <TableView
      title={Title}
      headLabel={Labels}
      items={admins}
      onDownload={handleDownload}
      onUpload={handleUpload}
      TableRow={UserTableRow}
      AddDialog={UserAddDialog}
    />
  );
}

export default AdminView;
