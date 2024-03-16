import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getStudent } from 'src/api/studentSlice';

// -----------------------------------------------------------------------

function StudentPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, show } = useSelector((state) => state.student);

  useEffect(() => {
    dispatch(getStudent(id));
  }, [dispatch, id]);

  return (
    <>
      <Helmet>
        <title>Student | {show?.name || ''}</title>
      </Helmet>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <h1>name: {show.name}/</h1>
          <h1>phone: {show.phone}/</h1>
          <h1>address: {show.address}/</h1>
          <h1>status: {show.status ? 'active' : 'banned'}/</h1>
          <h1>email: {show.email}/</h1>
          <h1>avatarUrl: {show.avatarUrl}/</h1>
          <h1>userType: {show.userType}/</h1>
          <h1>grade: {show.grade}/</h1>
          <h1>class_number: {show.class?.class_number}/</h1>
        </>
      )}
    </>
  );
}

export default StudentPage;
