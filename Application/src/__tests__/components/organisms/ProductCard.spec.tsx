import React from 'react';
import { render, screen } from '@testing-library/react';

import { ProductCard, ProductCardProps } from '@Application/src/components/organisms/ProductCard';

const productProps: ProductCardProps = {
  name: 'Product Name',
  description: 'Product Description',
  unit: 'Kg',
  price: '$100',
  image: 'https://dummyimage.com/400x600/000/fff&text=ProductImage',
  source: 'https://dummyimage.com/400x600/000/fff&text=ProductImage',
};

describe( '<ProductCard />', () => {
  test( 'Render component', () => {
    render( <ProductCard {...productProps} /> );

    expect( screen.getByText( productProps.name ) ).toBeVisible();
    expect( screen.getByText( productProps.description as string ) ).toBeVisible();
    expect( screen.getByText( productProps.unit ) ).toBeVisible();
    expect( screen.getByText( productProps.price as string ) ).toBeVisible();
    expect( screen.getByAltText( productProps.name ) ).toBeVisible();
    expect( screen.getByText( 'Agregar al Carrito' ) ).toBeVisible();
  } );
} );
