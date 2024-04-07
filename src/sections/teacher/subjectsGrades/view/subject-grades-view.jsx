import React from 'react';
import { useParams } from 'react-router-dom';

// import route from 'src/routes';

import { TableView } from 'src/sections/table/view';

import GradeTableRow from '../grade-table-row';
import GradeAddDialog from '../grade-add-dialog';

// -----------------------------------------------------------------------
const Title = 'Student Gardes';
const Labels = [
  { id: 'name', label: 'Name' },
  { id: 'status', label: 'Status' },
  { id: 'action', label: 'Action' },
];
// ------------------------------------------------------------------------

function SubjectGradesView() {
  const { id } = useParams();
  const handleDownload = () => {
    alert('file is downloaded !');
  };

  const handleUpload = (file) => {
    console.log(file, id);
  };

  return (
    // <Link to={route.teacher.subjects}>go back</Link>
    <TableView
      title={Title}
      headLabel={Labels}
      items={{ data: [] }}
      onDownload={handleDownload}
      onUpload={handleUpload}
      TableRow={GradeTableRow}
      AddDialog={GradeAddDialog}
    />
  );
}

export default SubjectGradesView;
