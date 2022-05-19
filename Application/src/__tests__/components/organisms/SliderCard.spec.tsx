import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { ProductCardProps } from '@Application/src/components/organisms/ProductCard';
import { SliderCard, SliderCardProps } from '@Application/src/components/organisms/SliderCard';

let container: HTMLElement;
const ITEMS_IN_SLIDE = 3;
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

beforeEach( () => {
  container = render( <SliderCard {...props} /> ).container;
} );

describe( '<SliderCard />', () => {
  test( 'Render component', () => {
    expect( screen.getAllByText( productProps.name ) ).toHaveLength( props.items.length );
    expect( screen.getAllByText( productProps.price ?? '' ) ).toHaveLength( props.items.length );
    expect( screen.getAllByText( 'Agregar al Carrito' ) ).toHaveLength( props.items.length );
    expect( container.querySelector( 'button[aria-label="previous item"]' ) ).toBeVisible();
    expect( container.querySelector( 'button[aria-label="next item"]' ) ).toBeVisible();
  } );

  test( 'should scroll when next and previous buttons are pressed', () => {
    window.HTMLElement.prototype.scrollTo = jest.fn();

    const buttonPrevious = container.querySelector( 'button[aria-label="previous item"]' ) as HTMLElement;
    const buttonNext = container.querySelector( 'button[aria-label="next item"]' ) as HTMLElement;

    fireEvent.click( buttonNext );
    fireEvent.click( buttonPrevious );

    expect( window.HTMLElement.prototype.scrollTo ).toHaveBeenCalledTimes( 2 );
  } );

  // describe( 'Button next', () => {
  // it( 'should it disabled when there are no pages/slides/items below', () => {
  //   const buttonNext = container.querySelector( 'button[aria-label="previous next"]' ) as HTMLElement;
  //   const clickNumberToDisableTheButton = props.items.length;

  //   for ( let i = 0; i < clickNumberToDisableTheButton; i++ ) {
  //     fireEvent.click( buttonNext );
  //   }

  //   expect( buttonNext ).toBeVisible();
  //   expect( buttonNext ).toBeDisabled();
  // } );

  // it( 'should change the items when press button', () => {
  //   const buttonNext = container.querySelector( 'button[aria-label="previous next"]' ) as HTMLElement;
  //   const items = screen.getAllByRole( 'listitem' );

  //   // Check the visibility of the items
  //   items.forEach( ( item, i ) => {
  //     const isItemVisible = i < ITEMS_IN_SLIDE;

  //     ( isItemVisible )
  //       ? expect( item ).toBeVisible()
  //       : expect( item ).not.toBeVisible();
  //   } );

  //   for ( let i = 0; i < ITEMS_IN_SLIDE; i++ ) {
  //     fireEvent.click( buttonNext );
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
  //   const buttonPrevious = container.querySelector( 'button[aria-label="previous item"]' ) as HTMLElement;
  //   const buttonNext = container.querySelector( 'button[aria-label="previous next"]' ) as HTMLElement;
  //   const clickNumberToDisableTheButton = props.items.length;

  //   expect( buttonNext ).toBeVisible();
  //   expect( buttonNext ).not.toBeDisabled();

  //   for ( let i = 0; i < clickNumberToDisableTheButton; i++ ) {
  //     fireEvent.click( buttonNext );
  //   }

  //   expect( buttonNext ).toBeVisible();
  //   expect( buttonNext ).toBeDisabled();

  //   fireEvent.click( buttonPrevious );

  //   expect( buttonNext ).toBeVisible();
  //   expect( buttonNext ).not.toBeDisabled();
  // } );
  // } );

  // describe( 'Button previous', () => {
  // it( 'should it disabled when the component is rendered', () => {
  //   const buttonPrevious = container.querySelector( 'button[aria-label="previous item"]' );

  //   expect( buttonPrevious ).toBeVisible();
  //   expect( buttonPrevious ).toBeDisabled();
  // } );

  // it( 'should change state on the button, depending on the buttons pressed', () => {
  //   const buttonPrevious = container.querySelector( 'button[aria-label="previous item"]' ) as HTMLElement;
  //   const buttonNext = container.querySelector( 'button[aria-label="previous next"]' ) as HTMLElement;

  //   expect( buttonPrevious ).toBeVisible();
  //   expect( buttonPrevious ).toBeDisabled();

  //   fireEvent.click( buttonNext );

  //   expect( buttonPrevious ).toBeVisible();
  //   expect( buttonPrevious ).not.toBeDisabled();
  // } );
  // } );

  // test( 'Disable buttons when the items to be less or equal then ITEMS_IN_SLIDE', () => {
  //   const renderResult = render( <SliderCard {...props} /> );
  //   const buttonPrevious = renderResult.container.querySelector( 'button[aria-label="previous item"]' );
  //   const buttonNext = renderResult.container.querySelector( 'button[aria-label="previous next"]' );

  //   expect( buttonPrevious ).toBeVisible();
  //   expect( buttonPrevious ).toBeDisabled();
  //   expect( buttonNext ).toBeVisible();
  //   expect( buttonNext ).toBeDisabled();
  // } );
} );
