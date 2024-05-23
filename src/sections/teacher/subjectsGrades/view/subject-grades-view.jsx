import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getGrades } from 'src/api/gradeSlice';
import { getSubject } from 'src/api/subjectSlice';
import { getStudentsWithNoGrades } from 'src/api/studentSlice';

import { TableView } from 'src/sections/table/view';

import GradeTableRow from '../grade-table-row';
import GradeAddDialog from '../grade-add-dialog';

// -----------------------------------------------------------------------
const Title = 'Student Gardes';
const Labels = [
  { id: 'name', label: 'Name' },
  { id: 'class', label: 'Class' },
  { id: 'midterm', label: 'Midterm' },
  { id: 'final', label: 'Final' },
  { id: 'behavior', label: 'Behavior' },
  { id: 'attendance', label: 'Attendance' },
  { id: 'total', label: 'Total' },
  { id: 'action', label: 'Action' },
];
// ------------------------------------------------------------------------

function SubjectGradesView() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const grades = useSelector((state) => state.grade);
  const subject = useSelector((state) => state.subject.data);

  const handleDownload = () => {
    alert('file is downloaded !');
  };

  const handleUpload = (file) => {
    console.log(file, id);
  };

  useEffect(() => {
    dispatch(getGrades(id));
    dispatch(getSubject(id));
    dispatch(getStudentsWithNoGrades(id));
  }, [dispatch]); // eslint-disable-line

  return (
    // <Link to={route.teacher.subjects}>go back</Link>
    <TableView
      title={Title}
      addTitle={` for ${subject.name}`}
      headLabel={Labels}
      items={grades}
      onDownload={handleDownload}
      onUpload={handleUpload}
      TableRow={GradeTableRow}
      AddDialog={GradeAddDialog}
    />
  );
}

export default SubjectGradesView;
