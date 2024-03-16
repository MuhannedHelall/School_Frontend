import { Helmet } from 'react-helmet-async';

import { AppView } from 'src/sections/superAdmin/overview/view';

// ----------------------------------------------------------------------

export default function AppPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard </title>
      </Helmet>

      <AppView />
    </>
  );
}
