import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getUser } from 'src/api/adminSlice';

import { Loader } from 'src/sections/loader';
import { ProfileView } from 'src/sections/profile/view';

// -----------------------------------------------------------------------

function ProfilePage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const user = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getUser(id));
  }, [dispatch, id]);

  return (
    <>
      <Helmet>
        <title>Profile | {user?.show?.name || id}</title>
      </Helmet>
      {user.loading ? <Loader /> : <ProfileView user={user.show} />}
    </>
  );
}

export default ProfilePage;
