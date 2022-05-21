import React from 'react';
import { act } from 'react-dom/test-utils';
import { chromium } from 'playwright';
import { render, screen } from '@testing-library/react';

import { ProductCardProps } from '@Application/src/components/organisms/ProductCard';
import { SliderCard, SliderCardProps } from '@Application/src/components/organisms/SliderCard';

let container: HTMLElement;
// const ITEMS_IN_SLIDE = 3;
const productProps: ProductCardProps = {
  name: 'Product Name',
  description: 'Product Description',
  unit: 'Kg',
  price: '$100',
  image: 'https://dummyimage.com/400x600/000/fff&text=ProductImage',
  source: 'https://dummyimage.com/400x600/000/fff&text=ProductImage',
};
const props: SliderCardProps = {
  items: new Array( 9 ).fill( productProps ),
};

const intersectionObserverMock = jest.fn( () => ( {
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
} ) );
const scrollToMock = jest.fn();

window.IntersectionObserver = intersectionObserverMock as any;
window.HTMLElement.prototype.scrollTo = scrollToMock;
window.setImmediate = window.setTimeout as any;

jest.setTimeout( 30000 );

beforeEach( async () => {
  await act( async () => {
    container = render( <SliderCard {...props} /> ).container;
    intersectionObserverMock.mockClear();
    scrollToMock.mockClear();
  } );
} );

describe( '<SliderCard />', () => {
  test( 'Render component', async () => {
    expect( await screen.findAllByText( productProps.name ) ).toHaveLength( props.items.length );
    expect( await screen.findAllByText( productProps.price ?? '' ) ).toHaveLength( props.items.length );
    expect( await screen.findAllByText( 'Agregar al Carrito' ) ).toHaveLength( props.items.length );
    expect( container.querySelector( 'button[aria-label="previous item"]' ) ).toBeVisible();
    expect( container.querySelector( 'button[aria-label="next item"]' ) ).toBeVisible();
  } );

  describe( 'Previous button', () => {
    it( 'should it disabled when the component is rendered', () => {
      const prevBtn = container.querySelector( 'button[aria-label="previous item"]' );

      expect( prevBtn ).toBeVisible();
      expect( prevBtn ).toBeDisabled();
    } );
  } );

  describe( 'Next button', () => {
    it( 'should it not disabled when the component is rendered', () => {
      const nextBtn = container.querySelector( 'button[aria-label="next item"]' );

      expect( nextBtn ).toBeVisible();
      expect( nextBtn ).not.toBeDisabled();
    } );

    it( 'should it disabled when there are no pages/slides/items below', async () => {
      const browser = await chromium.launch();
      const page = await browser.newPage();

      await page.goto( 'http://localhost:61000/?story=slider-card--slider-card' );

      expect( await page.locator( 'button[aria-label="next item"] >> nth=1' ).isEnabled() ).toBeTruthy();

      await page.locator( 'button[aria-label="next item"] >> nth=1' ).click( { clickCount: 2, delay: 200 } );
      await page.waitForTimeout( 500 );

      expect( await page.locator( 'button[aria-label="next item"] >> nth=1' ).isDisabled() ).toBeTruthy();
    } );

    // it( 'should change the items when press button', () => {
    //   const nextBtn = container.querySelector( 'button[aria-label="next item"]' ) as HTMLElement;
    //   const items = screen.getAllByRole( 'listitem' );

    //   // Check the visibility of the items
    //   items.forEach( ( item, i ) => {
    //     const isItemVisible = i < ITEMS_IN_SLIDE;

    //     ( isItemVisible )
    //       ? expect( item ).toBeVisible()
    //       : expect( item ).not.toBeVisible();
    //   } );

    //   for ( let i = 0; i < ITEMS_IN_SLIDE; i++ ) {
    //     fireEvent.click( nextBtn );
    //   }

    //   // Check the visibility of the items after clicks
    //   items.forEach( ( item, i ) => {
    //     const isItemVisible = i >= ITEMS_IN_SLIDE || i < ITEMS_IN_SLIDE * 2;

    //     ( isItemVisible )
    //       ? expect( item ).toBeVisible()
    //       : expect( item ).not.toBeVisible();
    //   } );
    // } );
  } );

  it( 'should change state on the button, depending on the buttons pressed', async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    await page.goto( 'http://localhost:61000/?story=slider-card--slider-card' );

    expect( await page.locator( 'button[aria-label="previous item"] >> nth=1' ).isDisabled() ).toBeTruthy();
    expect( await page.locator( 'button[aria-label="next item"] >> nth=1' ).isEnabled() ).toBeTruthy();

    await page.locator( 'button[aria-label="next item"] >> nth=1' ).click();
    await page.waitForTimeout( 500 );

    expect( await page.locator( 'button[aria-label="previous item"] >> nth=1' ).isEnabled() ).toBeTruthy();
    expect( await page.locator( 'button[aria-label="next item"] >> nth=1' ).isEnabled() ).toBeTruthy();

    await page.locator( 'button[aria-label="next item"] >> nth=1' ).click();
    await page.waitForTimeout( 500 );

    expect( await page.locator( 'button[aria-label="previous item"] >> nth=1' ).isEnabled() ).toBeTruthy();
    expect( await page.locator( 'button[aria-label="next item"] >> nth=1' ).isDisabled() ).toBeTruthy();
  } );

  test( 'Disable buttons when the items to be less or equal then ITEMS_IN_SLIDE', async () => {
    let renderResult: any;

    await act( async () => {
      renderResult = render( <SliderCard items={[ productProps ]} /> );
    } );

    if ( renderResult === undefined ) throw new Error( 'renderResult is undefined' );

    const prevBtn = renderResult.container.querySelector( 'button[aria-label="previous item"]' );
    const nextBtn = renderResult.container.querySelector( 'button[aria-label="next item"]' );

    expect( prevBtn ).toHaveAttribute( 'aria-disabled', 'true' );
    expect( nextBtn ).toHaveAttribute( 'aria-disabled', 'true' );

    expect( prevBtn ).toBeDisabled();
    expect( nextBtn ).toBeDisabled();
  } );
} );
