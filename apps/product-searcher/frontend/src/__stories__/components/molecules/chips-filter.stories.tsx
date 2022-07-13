import React, { useRef } from 'react';

import { ChipsFilter as Component } from '../../../components/molecules/chips-filter';

export function ChipsFilter () {
  const supermarketRef = useRef( [
    {
      name: 'Supermarket 1',
      active: false
    },
    {
      name: 'Supermarket 2',
      active: false
    },
    {
      name: 'Supermarket 3',
      active: false
    }
  ] );

  return (
    <>
      <section>
        <Component itemsRef={supermarketRef}/>
      </section>
      <hr />
    </>
  );
}
