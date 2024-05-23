import { toast } from 'react-toastify';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getSubjects } from 'src/api/subjectSlice';
import { uploadFile, downloadFile, getEmployees } from 'src/api/employeeSlice';

import { TableView } from 'src/sections/table/view';

import EmpTableRow from '../emp-table-row';
import EmpAddDialog from '../emp-add-dialog';

// -----------------------------------------------------------------------
const Labels = {
  employee: [
    { id: 'name', label: 'Name' },
    { id: 'status', label: 'Status' },
    { id: 'action', label: 'Action', align: 'center' },
  ],
  teacher: [
    { id: 'name', label: 'Name' },
    { id: 'subject', label: 'Subject' },
    { id: 'status', label: 'Status' },
    { id: 'action', label: 'Action', align: 'center' },
  ],
  student: [
    { id: 'name', label: 'Name' },
    { id: 'class', label: 'class' },
    { id: 'status', label: 'Status' },
    { id: 'action', label: 'Action', align: 'center' },
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

  useEffect(() => {
    if (user?.department_id === 4 || +id === 4) {
      Title = 'Teachers';
      headLabel = Labels.teacher;
    } else if (user?.department_id === 5 || +id === 5) {
      Title = 'Students';
      headLabel = Labels.student;
    }
    dispatch(getEmployees(user.department_id || +id));
    if (subs.data.length < 1) dispatch(getSubjects());
    return () => {
      Title = 'Employees';
      headLabel = Labels.employee;
    };
  }, [dispatch]); // eslint-disable-line

  const handleDownload = () => {
    dispatch(downloadFile());
  };

  const handleUpload = (file) => {
    const DTO = { file, id: user.department_id };
    toast.promise(dispatch(uploadFile(DTO)), {
      pending: 'File is being uploaded ...',
      success: {
        render({ data }) {
          dispatch(getEmployees(user.department_id));
          return data.payload[1];
        },
      },
      error: 'An error occured !',
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
