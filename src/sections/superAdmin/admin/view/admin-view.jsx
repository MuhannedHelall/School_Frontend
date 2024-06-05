import { toast } from 'react-toastify';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { getDepartments } from 'src/api/departmentSlice';
import { getAdmins, uploadFile, downloadFile } from 'src/api/adminSlice';

import { TableView } from 'src/sections/table/view';

import UserTableRow from '../admin-table-row';
import UserAddDialog from '../admin-add-dialog';

// ----------------------------------------------------------------------
// const Title = { en: 'Admins', ar: 'المديرين' };
const Title = 'Admins';
const Labels = [
  { id: 'name', label: { en: 'Name', ar: 'الاسم' } },
  { id: 'department', label: { en: 'Department', ar: 'القسم' } },
  { id: 'status', label: { en: 'Status', ar: 'الحالة' } },
  { id: 'action', label: { en: 'Action', ar: 'التصرف' }, align: 'center' },
];
// ----------------------------------------------------------------------

function AdminView() {
  const dispatch = useDispatch();
  const admins = useSelector((state) => state.admin);
  const departments = useSelector((state) => state.department.data);
  const { t } = useTranslation();

  const handleDownload = () => {
    dispatch(downloadFile());
  };

  const handleUpload = (file) => {
    toast.promise(dispatch(uploadFile(file)), {
      pending: t('fileBeingUploaded'),
      success: {
        render({ data }) {
          dispatch(getAdmins());
          // setOpenUploadDialog(false);
          return data.payload[1];
        },
      },
      error: t('errorOccured'),
    });
  };

  useEffect(() => {
    if (admins.data.length < 1) dispatch(getAdmins());
    if (departments.length < 1) dispatch(getDepartments());
  }, [dispatch]); // eslint-disable-line

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
