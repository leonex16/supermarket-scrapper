import { expect, test } from '@playwright/experimental-ct-react';

import { ChipsFilter, ChipsFilterProps } from '../../../src/components/molecules/chips-filter';

const props: ChipsFilterProps = {
  itemsRef: {
    current: [
      {
        name: 'item 1',
        active: false
      },
      {
        name: 'item 2',
        active: false
      }
    ]
  } as any
};

test.describe( '<ChipsFilter />', () => {
  test( 'should render component', async ( { page, mount } ) => {
    await mount( <ChipsFilter {...props} /> );
    const promises = props.itemsRef.current.map( ( item: any ) => expect( page.locator( `text="${ item.name }"` ) ).toBeVisible() );

    await expect( Promise.all( promises ) ).resolves.not.toThrow();
  } );

  test( 'should show when a chips is selected', async ( { page, mount } ) => {
    await mount( <ChipsFilter {...props} /> );
    const chipToSelect = props.itemsRef.current[ 0 ];

    page.locator( `text="${ chipToSelect.name }"` ).click();

    await expect( page.locator( 'span[aria-checked="true"]' ) ).toBeVisible();
  } );

  test( 'should go back state the chips unselected', async ( { page, mount } ) => {
    await mount( <ChipsFilter {...props} /> );
    const chipToSelect = props.itemsRef.current[ 0 ];

    page.locator( `text="${ chipToSelect.name }"` ).click( { clickCount: 2 } );

    await expect( page.locator( 'span[aria-checked="false"] >> nth=0' ) ).toBeVisible();
  } );
} );
