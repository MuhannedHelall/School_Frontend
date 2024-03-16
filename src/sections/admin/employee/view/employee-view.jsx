import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getSubjects } from 'src/api/subjectSlice';
import { getEmployees } from 'src/api/employeeSlice';

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
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.data);
  const emps = useSelector((state) => state.employee);
  const subs = useSelector((state) => state.subject);

  if (user?.department_id === 4) {
    Title = 'Teachers';
    headLabel = Labels.teacher;
  } else if (user?.department_id === 5) {
    Title = 'Students';
    headLabel = Labels.student;
  }

  useEffect(() => {
    if (emps.data.length < 1) dispatch(getEmployees(user.department_id));
    if (subs.data.length < 1) dispatch(getSubjects());
    return () => {
      Title = 'Employoees';
      headLabel = Labels.employee;
    };
  }, [dispatch]); // eslint-disable-line

  const handleDownload = () => {
    console.log('file is downloaded !');
  };

  const handleUpload = (file) => {
    console.log(file);
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
