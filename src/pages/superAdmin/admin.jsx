import { Helmet } from 'react-helmet-async';

import { AdminView } from 'src/sections/superAdmin/admin/view';

// ----------------------------------------------------------------------

export default function AdminPage() {
  return (
    <>
      <Helmet>
        <title> Admins </title>
      </Helmet>

      <AdminView />
    </>
  );
}
