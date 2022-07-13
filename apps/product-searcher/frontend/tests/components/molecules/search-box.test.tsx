import { expect, test } from '@playwright/experimental-ct-react';

import { SearchBox, SearchBoxProps } from '../../../src/components/molecules/search-box';

const props: SearchBoxProps = {
  handleSubmit: ( () => {
    let calledTimes = 0;

    return () => calledTimes++;
  } )(),
  placeholder: 'Search Box Placeholder'
};

test.describe( '<SearchBox />', () => {
  test( 'should render component', async ( { page, mount } ) => {
    await mount( <SearchBox {...props} /> );

    await expect( page.locator( `[placeholder="${ props.placeholder }"]` ) ).toBeVisible();
  } );

  test( 'should fire onSubmit event pressing enter', async ( { page, mount } ) => {
    await mount( <SearchBox {...props} /> );

    await page.locator( 'button' ).press( 'Enter' );

    expect( props.handleSubmit( null as any ) ).toBe( 1 );
  } );

  test( 'should fire onSubmit event pressing button', async ( { page, mount } ) => {
    await mount( <SearchBox {...props} /> );

    await page.locator( 'button' ).click();

    expect( props.handleSubmit( null as any ) ).toBe( 1 );
  } );
} );
