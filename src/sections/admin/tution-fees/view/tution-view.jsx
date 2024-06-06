// import { toast } from 'react-toastify';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getClasses } from 'src/api/classSlice';
import { getGradesTutionFees } from 'src/api/tutionSlice';

import { TableView } from 'src/sections/table/view';

import TutionDialog from '../tution-dialog';
import TutionTableRow from '../tution-table-row';

// -----------------------------------------------------------------------
const Labels = [
  { id: 'grade', label: { en: 'Grade', ar: 'المرحلة' } },
  { id: 'fees', label: { en: 'Fees', ar: 'الرسوم' } },
  { id: 'action', label: { en: 'Action', ar: 'التصرف' }, align: 'center' },
];
const Title = 'Tution Fees';

// ------------------------------------------------------------------------
function TutionView() {
  const dispatch = useDispatch();
  const classes = useSelector((state) => state.class);
  const fees = useSelector((state) => state.tution);

  useEffect(() => {
    if (fees.data.length < 1) dispatch(getGradesTutionFees());
    if (classes.data.length < 1) dispatch(getClasses());
  }, [dispatch]); // eslint-disable-line

  const handleDownload = () => {
    // dispatch(downloadFile());
  };

  const handleUpload = (file) => {
    // toast.promise(dispatch(uploadFile(file)), {
    //   pending: 'File is being uploaded ...',
    //   success: {
    //     render({ data }) {
    //       if (subject_id) {
    //         dispatch(getStudentsInClass(subject_id));
    //       } else {
    //         dispatch(getStudents());
    //       }
    //       return data.payload[1];
    //     },
    //   },
    //   error: 'An error occured !',
    // });
  };

  return (
    <TableView
      title={Title}
      headLabel={Labels}
      items={fees}
      onDownload={handleDownload}
      onUpload={handleUpload}
      TableRow={TutionTableRow}
      AddDialog={TutionDialog}
    />
  );
}

export default TutionView;
