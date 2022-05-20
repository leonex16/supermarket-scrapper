import React from 'react';

import { SliderCard as Component } from '@Application/src/components/organisms/SliderCard';
import { ProductCardProps } from '@Application/src/components/organisms/ProductCard';

export function SliderCard() {
  const itemNumberToSlides = [ 3, 6, 12, 18 ];
  const productProps: ProductCardProps = {
    name: 'Product Name',
    description: 'Product Description',
    unit: 'Kg',
    price: '$100',
    image: 'https://picsum.photos/200/300',
    source: 'https://dummyimage.com/400x600/000/fff&text=ProductImage',
  };

  return (
    <>
      {
        itemNumberToSlides.map( ( itemNumberToSlide, i ) => (
          <section key={i}>
            <header>
              <h3>{`Slider with ${ itemNumberToSlide } items`}</h3>
            </header>
            <Component items={
              new Array( itemNumberToSlide ).fill( productProps ).map( ( item, indx ) => ( { ...item, loading: indx < 5 ? 'eager' : 'lazy' } ) )
            } />
            <hr />
          </section>
        ) )
      }
    </>
  );
}
