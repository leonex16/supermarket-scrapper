import React from 'react';

import { ProductCardLoader as Component } from '@Application/src/components/molecules/ProductCardLoader';

export function ProductCardLoader() {
  return (
    <>
      <section style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <Component/>
        <Component/>
        <Component/>
      </section>
      <hr />
    </>
  );
}
