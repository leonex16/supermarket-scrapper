import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

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

beforeEach( () => {
  container = render( <SliderCard {...props} /> ).container;
  intersectionObserverMock.mockClear();
  scrollToMock.mockClear();
} );

describe( '<SliderCard />', () => {
  test( 'Render component', () => {
    expect( screen.getAllByText( productProps.name ) ).toHaveLength( props.items.length );
    expect( screen.getAllByText( productProps.price ?? '' ) ).toHaveLength( props.items.length );
    expect( screen.getAllByText( 'Agregar al Carrito' ) ).toHaveLength( props.items.length );
    expect( container.querySelector( 'button[aria-label="previous item"]' ) ).toBeVisible();
    expect( container.querySelector( 'button[aria-label="next item"]' ) ).toBeVisible();
  } );

  describe( 'Previous button', () => {
    it( 'should it disabled when the component is rendered', () => {
      const prevBtn = container.querySelector( 'button[aria-label="previous item"]' );

      expect( prevBtn ).toBeVisible();
      expect( prevBtn ).toBeDisabled();
    } );

    // it( 'should change state on the button, depending on the buttons pressed', () => {
    //   const prevBtn = container.querySelector( 'button[aria-label="previous item"]' ) as HTMLElement;
    //   const nextBtn = container.querySelector( 'button[aria-label="next item"]' ) as HTMLElement;

    //   expect( prevBtn ).not.toBeVisible();
    //   expect( prevBtn ).toBeDisabled();

    //   fireEvent.click( nextBtn );

    //   expect( prevBtn ).toBeVisible();
    //   expect( prevBtn ).not.toBeDisabled();
    // } );
  } );

  describe( 'Next button', () => {
    it( 'should it not disabled when the component is rendered', () => {
      const nextBtn = container.querySelector( 'button[aria-label="next item"]' );

      expect( nextBtn ).toBeVisible();
      expect( nextBtn ).not.toBeDisabled();
    } );

    // it( 'should it disabled when there are no pages/slides/items below', () => {
    //   const nextBtn = container.querySelector( 'button[aria-label="next item"]' ) as HTMLElement;
    //   const clickNumberToDisableTheButton = props.items.length;

    //   for ( let i = 0; i < clickNumberToDisableTheButton; i++ ) {
    //     fireEvent.click( nextBtn );
    //   }

    //   expect( nextBtn ).toBeVisible();
    //   expect( nextBtn ).toBeDisabled();
    // } );

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

    // it( 'should change state on the button, depending on the buttons pressed', () => {
    //   const prevBtn = container.querySelector( 'button[aria-label="previous item"]' ) as HTMLElement;
    //   const nextBtn = container.querySelector( 'button[aria-label="next item"]' ) as HTMLElement;
    //   const clickNumberToDisableTheButton = props.items.length;

    //   expect( nextBtn ).toBeVisible();
    //   expect( nextBtn ).not.toBeDisabled();

    //   for ( let i = 0; i < clickNumberToDisableTheButton; i++ ) {
    //     fireEvent.click( nextBtn );
    //   }

    //   expect( nextBtn ).toBeVisible();
    //   expect( nextBtn ).toBeDisabled();

    //   fireEvent.click( prevBtn );

    //   expect( nextBtn ).toBeVisible();
    //   expect( nextBtn ).not.toBeDisabled();
    // } );
  } );

  test( 'Disable buttons when the items to be less or equal then ITEMS_IN_SLIDE', () => {
    const renderResult = render( <SliderCard items={[ productProps ]} /> );
    const prevBtn = renderResult.container.querySelector( 'button[aria-label="previous item"]' );
    const nextBtn = renderResult.container.querySelector( 'button[aria-label="next item"]' );
    expect( prevBtn ).toHaveAttribute( 'aria-disabled', 'true' );
    expect( nextBtn ).toHaveAttribute( 'aria-disabled', 'true' );

    expect( prevBtn ).toBeDisabled();
    expect( nextBtn ).toBeDisabled();
  } );

  // test( 'should scroll when next and previous buttons are pressed', () => {
  //   const prevBtn = container.querySelector( 'button[aria-label="previous item"]' ) as HTMLElement;
  //   const nextBtn = container.querySelector( 'button[aria-label="next item"]' ) as HTMLElement;

  //   fireEvent.click( nextBtn );
  //   fireEvent.click( prevBtn );

  //   expect( window.HTMLElement.prototype.scrollTo ).toHaveBeenCalledTimes( 2 );
  // } );
} );
