import { expect, test } from '@playwright/experimental-ct-react';

import { LineBar } from '../../../src/components/molecules/line-bar';

test.describe( '<LineBar />', () => {
  test( 'should render component', async ( { page, mount } ) => {
    await mount( <LineBar /> );
    const TOTAL_SUPERMARKETS = 4;

    await expect( page.locator( 'span' ) ).toHaveCount( TOTAL_SUPERMARKETS );
  } );
} );
