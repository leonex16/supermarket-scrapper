import { expect, test } from '@playwright/experimental-ct-react';

import { Headline, HeadlineProps } from '../../../src/components/molecules/headline';

const props: HeadlineProps = {
  supermarket: 'jumbo' as any,
  text: 'Headline Title',
  type: 'h1' as any
};

test.describe( '<Headline />', () => {
  test( 'should render component', async ( { page, mount } ) => {
    await mount( <Headline {...props} /> );

    await expect( page.locator( `text="${ props.text }"` ) ).toBeVisible();
  } );

  test( 'Check if headline type is render correctly', async ( { page, mount } ) => {
    await mount( <Headline {...props} /> );

    await expect( page.locator( props.type, { hasText: props.text } ) ).toBeVisible();
  } );
} );
