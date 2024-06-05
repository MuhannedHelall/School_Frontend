import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getGrades } from 'src/api/gradeSlice';
// import { getSubject } from 'src/api/subjectSlice';
import { getStudentsWithNoGrades } from 'src/api/studentSlice';

import { TableView } from 'src/sections/table/view';

import GradeTableRow from '../grade-table-row';
import GradeAddDialog from '../grade-add-dialog';

// -----------------------------------------------------------------------
const Title = 'Student Gardes';
const Labels = [
  { id: 'name', label: { en: 'Name', ar: 'الأسم' } },
  { id: 'class', label: { en: 'Class', ar: 'الفصل' } },
  { id: 'midterm', label: { en: 'Midterm', ar: 'منتصف العام' } },
  { id: 'final', label: { en: 'Final', ar: 'نهاية العام' } },
  { id: 'behavior', label: { en: 'Behavior', ar: 'السلوك' } },
  { id: 'attendance', label: { en: 'Attendance', ar: 'الحضور' } },
  { id: 'total', label: { en: 'Total', ar: 'المجموع' } },
  { id: 'action', label: { en: 'Action', ar: 'التصرف' } },
];
// ------------------------------------------------------------------------

function SubjectGradesView() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const grades = useSelector((state) => state.grade);

  const handleDownload = () => {
    alert('file is downloaded !');
  };

  const handleUpload = (file) => {
    console.log(file, id);
  };

  useEffect(() => {
    dispatch(getGrades(id));
    // dispatch(getSubject(id));
    dispatch(getStudentsWithNoGrades(id));
  }, [dispatch]); // eslint-disable-line

  return (
    // <Link to={route.teacher.subjects}>go back</Link>
    <TableView
      title={Title}
      //   addTitle={` for ${subject.name}`}
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
