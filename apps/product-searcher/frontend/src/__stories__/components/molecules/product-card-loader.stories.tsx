import React from 'react';

import { ProductCardLoader as Component } from '../../../components/molecules/product-card-loader';

export function ProductCardLoader () {
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
