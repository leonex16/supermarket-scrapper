import React from 'react';
import { SearchBox as Component, SearchBoxProps } from '@Application/src/components/molecules/SearchBox';

export function SearchBoxWithErrorOfLadle() {
  const props: SearchBoxProps = {
    handleSubmit: e => {
      console.log(e.target)
    },
    placeholder: 'Search box placeholder...'
  }

  return (
    <>
      <section>
        <Component {...props} />
      </section>
      <hr />
    </>
  );
}
