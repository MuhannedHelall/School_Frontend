import { toast } from 'react-toastify';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { getSubjects } from 'src/api/subjectSlice';
import { uploadFile, downloadFile, getEmployees } from 'src/api/employeeSlice';

import { TableView } from 'src/sections/table/view';

import EmpTableRow from '../emp-table-row';
import EmpAddDialog from '../emp-add-dialog';

// -----------------------------------------------------------------------
const Labels = {
  employee: [
    { id: 'name', label: { en: 'Name', ar: 'الاسم' } },
    { id: 'status', label: { en: 'Status', ar: 'الحالة' } },
    { id: 'action', label: { en: 'Action', ar: 'التصرف' }, align: 'center' },
  ],
  teacher: [
    { id: 'name', label: { en: 'Name', ar: 'الأسم' } },
    { id: 'subject', label: { en: 'Subject', ar: 'المادة' } },
    { id: 'status', label: { en: 'Status', ar: 'الحالة' } },
    { id: 'action', label: { en: 'Action', ar: 'التصرف' }, align: 'center' },
  ],
  student: [
    { id: 'name', label: { en: 'Name', ar: 'الأسم' } },
    { id: 'class', label: { en: 'class', ar: 'الفصل' } },
    { id: 'status', label: { en: 'Status', ar: 'الحالة' } },
    { id: 'action', label: { en: 'Action', ar: 'التصرف' }, align: 'center' },
  ],
};
let Title = 'Employees';
let headLabel = Labels.employee;

// ------------------------------------------------------------------------
function EmployeeView() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.data);
  const emps = useSelector((state) => state.employee);
  const subs = useSelector((state) => state.subject);
  const { t } = useTranslation();

  useEffect(() => {
    if (user?.department_id === 4 || +id === 4) {
      Title = t('teachers');
      headLabel = Labels.teacher;
    } else if (user?.department_id === 5 || +id === 5) {
      Title = t('students');
      headLabel = Labels.student;
    }

    dispatch(getEmployees(user.department_id || +id));
    if (subs.data.length < 1) dispatch(getSubjects());

    return () => {
      Title = t('employees');
      headLabel = Labels.employee;
    };
  }, [dispatch]); // eslint-disable-line

  const handleDownload = () => {
    dispatch(downloadFile());
  };

  const handleUpload = (file) => {
    const DTO = { file, id: user.department_id || id };
    toast.promise(dispatch(uploadFile(DTO)), {
      pending: t('fileBeingUploaded'),
      success: {
        render({ data }) {
          dispatch(getEmployees(user.department_id || id));
          return data.payload[1];
        },
      },
      error: t('errorOccured'),
    });
  };

  return (
    <TableView
      title={Title}
      headLabel={headLabel}
      items={emps}
      onDownload={handleDownload}
      onUpload={handleUpload}
      TableRow={EmpTableRow}
      AddDialog={EmpAddDialog}
    />
  );
}

export default EmployeeView;
