
import React from 'react'
import { Button, ButtonColor, ButtonProps } from '@Application/src/components/molecules/Button';
import { render, fireEvent } from '@testing-library/react';

describe('<Button />', () => {
  test('Render component', () => {
    const props: ButtonProps = {
      color: ButtonColor.Primary,
      onClick: jest.fn(),
      text: 'Button Text'
    };
    
    const component = render(<Button {...props} />)

    fireEvent.click(component.getByText(props.text))

    expect(props.onClick).toHaveBeenCalledTimes(1)
  })
})