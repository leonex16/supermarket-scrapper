
import { expect, test } from '@playwright/experimental-ct-react';

import { ProductCardLoader } from '../../../src/components/molecules/product-card-loader';

test.describe( '<ProductCardLoader />', () => {
  test( 'should render component', async ( { mount } ) => {
    const compnent = await mount( <ProductCardLoader /> );

    await expect( compnent ).toBeVisible();
  } );
} );
