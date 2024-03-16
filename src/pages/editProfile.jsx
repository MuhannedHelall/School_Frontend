import { Helmet } from 'react-helmet-async';

import { EditProfileView } from 'src/sections/editProfile';

// ----------------------------------------------------------------------

export default function EditProfilePage() {
  return (
    <>
      <Helmet>
        <title> Edit Profile </title>
      </Helmet>

      <EditProfileView />
    </>
  );
}
