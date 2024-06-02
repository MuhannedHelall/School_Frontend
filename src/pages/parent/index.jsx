import { Helmet } from 'react-helmet-async';

import { AppView } from 'src/sections/parent/overview/view';

function Index() {
  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>

      <AppView />
    </>
  );
}

export default Index;
