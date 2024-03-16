import { toast } from 'react-toastify';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getClasses } from 'src/api/classSlice';
import { uploadFile, getStudents, downloadFile } from 'src/api/studentSlice';

import { TableView } from 'src/sections/table/view';

import StudentDialog from '../student-dialog';
import StudentTableRow from '../student-table-row';

// -----------------------------------------------------------------------
const Labels = [
  { id: 'name', label: 'Name' },
  { id: 'class', label: 'class' },
  { id: 'status', label: 'Status' },
  { id: 'action', label: 'Action', align: 'center' },
];
const Title = 'Students';

// ------------------------------------------------------------------------
function StudentView() {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.student);
  const classes = useSelector((state) => state.class);

  useEffect(() => {
    if (students.data.length < 1) dispatch(getStudents());
    if (classes.data.length < 1) dispatch(getClasses());
  }, [dispatch]); // eslint-disable-line

  const handleDownload = () => {
    dispatch(downloadFile());
  };

  const handleUpload = (file) => {
    toast.promise(dispatch(uploadFile(file)), {
      pending: 'File is being uploaded ...',
      success: {
        render({ data }) {
          dispatch(getStudents());
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
      items={students}
      onDownload={handleDownload}
      onUpload={handleUpload}
      TableRow={StudentTableRow}
      AddDialog={StudentDialog}
    />
  );
}

export default StudentView;
