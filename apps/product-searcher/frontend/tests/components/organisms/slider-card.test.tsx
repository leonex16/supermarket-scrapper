import { expect, test } from '@playwright/experimental-ct-react';

import type { ProductCardProps } from '../../../src/components/organisms/product-card';
import { SliderCard, SliderCardProps } from '../../../src/components/organisms/slider-card';

const ITEMS_IN_SLIDE = 3;
const productProps: ProductCardProps = {
  name: 'Product Name',
  description: 'Product Description',
  unit: 'Kg',
  price: '$100',
  image: 'https://dummyimage.com/400x600/000/fff&text=ProductImage',
  source: 'https://dummyimage.com/400x600/000/fff&text=ProductImage'
};
const props: SliderCardProps = {
  items: new Array( 9 ).fill( productProps )
};

test.describe( '<SliderCard />', () => {
  test( 'should render component', async ( { page, mount } ) => {
    await mount( <SliderCard {...props} /> );

    await expect( page.locator( `text="${ productProps.name }" >> nth=0` ) ).toBeVisible();
    await expect( page.locator( `text="${ productProps.price }" >> nth=0` ) ).toBeVisible();
    await expect( page.locator( 'text="Agregar al Carrito" >> nth=0' ) ).toBeVisible();
    await expect( page.locator( 'button[aria-label="previous item"]' ) ).toBeDisabled();
    await expect( page.locator( 'button[aria-label="next item"]' ) ).toBeVisible();
  } );

  test.describe( 'Previous button', () => {
    test( 'should be disabled when the component is first time rendered', async ( { page, mount } ) => {
      await mount( <SliderCard {...props} /> );
      await page.waitForTimeout( 500 );
      await expect( page.locator( 'button[aria-label="previous item"]' ) ).toBeDisabled();
    } );

    test( 'should enable after click on next item', async ( { page, mount } ) => {
      await mount( <SliderCard {...props} /> );

      await page.locator( 'button[aria-label="next item"]' ).click( { clickCount: 1, delay: 200 } );
      await page.waitForTimeout( 500 );

      await expect( page.locator( 'button[aria-label="previous item"]' ) ).not.toBeDisabled();
    } );
  } );

  test.describe( 'Next button', () => {
    test( 'should not be disabled when the component is first time rendered', async ( { page, mount } ) => {
      await mount( <SliderCard {...props} /> );

      await expect( page.locator( 'button[aria-label="next item"]' ) ).not.toBeDisabled();
    } );

    test( 'should disabled when there are no pages/slides/items below', async ( { page, mount } ) => {
      await mount( <SliderCard {...props} /> );
      const clicks = Math.floor( props.items.length / ITEMS_IN_SLIDE );

      await page.locator( 'button[aria-label="next item"]' ).click( { clickCount: clicks, delay: 200 } );
      await page.waitForTimeout( 500 );

      await expect( page.locator( 'button[aria-label="next item"]' ) ).toBeDisabled();
    } );

    // test( 'should change the items when press button', async ( { page, mount } ) => {
    //   await mount( <SliderCard {...props} /> );
    //   const lastItemOfSlide = page.locator( '[role="listitem"] >> nth=2' );

    //   await expect( lastItemOfSlide ).toBeVisible();

    //   await page.locator( 'button[aria-label="next item"]' ).click( { clickCount: 2, delay: 200 } );

    //   await expect( lastItemOfSlide ).toBeInTheViewport();
    // } );
  } );

  test( 'should change state on the button, depending on the buttons pressed', async ( { page, mount } ) => {
    await mount( <SliderCard {...props} /> );

    await expect( page.locator( 'button[aria-label="previous item"]' ) ).toBeDisabled();
    await expect( page.locator( 'button[aria-label="next item"]' ) ).toBeEnabled();

    await page.locator( 'button[aria-label="next item"]' ).click();
    await page.waitForTimeout( 500 );

    await expect( page.locator( 'button[aria-label="previous item"]' ) ).toBeEnabled();
    await expect( page.locator( 'button[aria-label="next item"]' ) ).toBeEnabled();

    await page.locator( 'button[aria-label="next item"]' ).click( { clickCount: 2, delay: 200 } );
    await page.waitForTimeout( 500 );

    await expect( page.locator( 'button[aria-label="previous item"]' ) ).toBeEnabled();
    await expect( page.locator( 'button[aria-label="next item"]' ) ).toBeDisabled();
  } );

  test( 'Disable buttons when the items to be less or equal then ITEMS_IN_SLIDE', async ( { page, mount } ) => {
    props.items.length = ITEMS_IN_SLIDE;
    await mount( <SliderCard {...props} /> );

    await expect( page.locator( 'button[aria-label="previous item"]' ) ).toHaveAttribute( 'aria-disabled', 'true' );
    await expect( page.locator( 'button[aria-label="next item"]' ) ).toHaveAttribute( 'aria-disabled', 'true' );

    await expect( page.locator( 'button[aria-label="previous item"]' ) ).toBeDisabled();
    await expect( page.locator( 'button[aria-label="next item"]' ) ).toBeDisabled();
  } );
} );
