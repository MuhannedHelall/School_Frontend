import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getStudent } from 'src/api/studentSlice';

import { Loader } from 'src/sections/loader';
import { ProfileView } from 'src/sections/profile/view';

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
      {loading ? <Loader /> : <ProfileView user={show} />}
    </>
  );
}

export default StudentPage;
