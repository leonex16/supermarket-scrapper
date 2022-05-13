import React from 'react';
import { render } from '@testing-library/react';

import {LineBar} from '@Application/src/components/molecules/LineBar'

describe('<LineBar />', () => {
  test('Render component', () => {
    const { container } = render(<LineBar />);
    const TOTAL_SUPERMARKETS = 4;

    expect(container.querySelectorAll('span').length).toBe(TOTAL_SUPERMARKETS)
  })
})