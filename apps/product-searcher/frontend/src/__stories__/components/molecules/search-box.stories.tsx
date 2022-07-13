import React from 'react';

import { SearchBox as Component, SearchBoxProps } from '../../../components/molecules/search-box';

export function SearchBox () {
  const props: SearchBoxProps = {
    handleSubmit: e => {
      console.info( e.target );
    },
    placeholder: 'Search box placeholder...'
  };

  return (
    <>
      <section>
        <Component {...props} />
      </section>
      <hr />
    </>
  );
}
