import { Helmet } from 'react-helmet-async';

import { AppView } from 'src/sections/admin/overview/view';

function AdminIndex() {
  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>

      <AppView />
    </>
  );
}

export default AdminIndex;
