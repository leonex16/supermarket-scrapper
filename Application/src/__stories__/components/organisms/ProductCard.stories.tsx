import React from 'react';

import { ProductCard as Component, ProductCardProps } from '@Application/src/components/organisms/ProductCard';

export function ProductCard() {
  const props: ProductCardProps = {
    name: 'Product Name',
    description: 'Product description very long for testing purposes',
    unit: 'Kg',
    price: '$100',
    image: 'https://picsum.photos/200/300',
    source: 'https://dummyimage.com/400x600/000/fff&text=ProductImage',
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
