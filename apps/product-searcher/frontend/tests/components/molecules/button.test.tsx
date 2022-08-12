import { expect, test } from '@playwright/experimental-ct-react';

import { Button, ButtonProps } from '../../../src/components/molecules/button';

const props: ButtonProps = {
  color: 'scr-btn--primary' as any,
  onClick: ( () => {
    let calledTimes = 0;
    return () => calledTimes++;
  } )(),
  text: 'Button Text'
};

test.describe( '<Button />', () => {
  test( 'should render component', async ( { page, mount } ) => {
    await mount( <Button {...props} /> );

    await expect( page.locator( `text="${ props.text }"` ) ).toBeVisible();
  } );

  test( 'should fire onClick event', async ( { page, mount } ) => {
    await mount( <Button {...props} /> );

    await page.locator( `text="${ props.text }"` ).click();

    expect( props.onClick( null as any ) ).toBe( 1 );
  } );
} );
