import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { ChipsFilter, ChipsFilterProps } from '@Application/src/components/molecules/ChipsFilter';

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
}

describe('<ChipsFilter />', () => {
  test('Render component', () => {
    render(<ChipsFilter {...props} />);

    props.itemsRef.current.forEach( item => {
      screen.getByText(item.name)
    })
  })

  test('Select only one chip', () => {
    render(<ChipsFilter {...props} />);
    
    const item = props.itemsRef.current[0]!;
    const itemElement = screen.getByText(item.name);

    fireEvent.click(itemElement);

    expect(item.active).toBeTruthy();
  })

  test('Unselect only one chip', () => {
    render(<ChipsFilter {...props} />);
    
    const item = props.itemsRef.current[1]!;
    const itemElement = screen.getByText(item.name);

    fireEvent.click(itemElement);
    fireEvent.click(itemElement);

    expect(item.active).toBeFalsy();
  })
})