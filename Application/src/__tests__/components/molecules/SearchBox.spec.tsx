import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { SearchBox, SearchBoxProps } from '@Application/src/components/molecules/SearchBox';

const props: SearchBoxProps = {
  handleSubmit: jest.fn( e => e.preventDefault() ),
  placeholder: 'Search Box Placeholder',
};

beforeEach( () => {
  ( props.handleSubmit as jest.Mock<any, any> ).mockClear();
} );

describe( '<SearchBox />', () => {
  test( 'Render component', () => {
    render( <SearchBox {...props} /> );
    screen.getByPlaceholderText( props.placeholder );
  } );

  test( 'Check if fire onSubmit event pressing enter', () => {
    const { container } = render( <SearchBox {...props} /> );
    const form = container.querySelector( 'form' );

    if ( form === null ) throw new Error( 'Form not found' );

    fireEvent.submit( form );

    expect( props.handleSubmit ).toBeCalledTimes( 1 );
  } );

  test( 'Check if fire onSubmit event pressing button', () => {
    const { container } = render( <SearchBox {...props} /> );
    const btn = container.querySelector( 'button' );

    if ( btn === null ) throw new Error( 'Button not found' );

    fireEvent.click( btn );

    expect( props.handleSubmit ).toBeCalledTimes( 1 );
  } );
} );
