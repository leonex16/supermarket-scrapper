import React from 'react';
import { render } from '@testing-library/react';

import { ProductCardLoader } from '@Application/src/components/molecules/ProductCardLoader';

describe( '<ProductCardLoader />', () => {
  test( 'Render component', () => {
    const { container } = render( <ProductCardLoader /> );

    expect( container ).toBeInTheDocument();
    expect( container ).toBeVisible();
  } );
} );
