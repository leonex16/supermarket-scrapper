import React from 'react'
import {render, screen} from '@testing-library/react';

import { Headline, HeadlineProps, HeadlineSupermarket, HeadlineType } from '@Application/src/components/molecules/Headline';

const props: HeadlineProps = {
  supermarket: HeadlineSupermarket.Jumbo,
  text: 'Headline Title',
  type: HeadlineType.H1
};

describe('<Headline />', () => {
  test('Render component', () => {
    render(<Headline {...props} />)
    screen.getByText(props.text)
  })

  test('Check if headline type is render correctly', () => {
    const { container } = render(<Headline {...props} />)
    const cssSelector = props.type

    container.querySelector(cssSelector)
  })
})