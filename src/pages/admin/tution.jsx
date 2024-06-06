import { Helmet } from 'react-helmet-async';

import { TutionView } from 'src/sections/admin/tution-fees/view';

function TutionPage() {
  return (
    <>
      <Helmet>
        <title>Tution fees</title>
      </Helmet>

      <TutionView />
    </>
  );
}

export default TutionPage;
