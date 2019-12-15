/**
 *
 * Tests for SeatLayout
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import 'jest-dom/extend-expect';

import SeatLayout from '../index';

describe('<SeatLayout />', () => {
  let props;

  beforeAll(() => {
    props = {
      seatLayout: [
        {
          id: 'row-a',
          seats: [
            {
              id: 'a1',
              type: 'std',
            },
            {
              id: 'a2',
              type: 'emp',
            },
          ],
        },
        {
          id: 'row-b',
          seats: [
            {
              id: 'b1',
              type: 'dlx',
            },
            {
              id: 'b2',
              type: 'rvd',
            },
          ],
        },
        {
          id: 'row-c',
          seats: [
            {
              id: 'c1',
              type: 'vip',
            },
            {
              id: 'c2',
              type: 'vip',
            },
          ],
        },
      ],
      selectedIds: ['a1'],
      seatPrice: {
        std: 10000,
        dlx: 20000,
        vip: 15000,
      },
      onSelect: jest.fn(),
    };
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(<SeatLayout {...props} />);
    expect(firstChild).toMatchSnapshot();
  });

  it('onSelect', () => {
    const { getByTestId } = render(<SeatLayout {...props} />);

    fireEvent.click(getByTestId('seat-layout-a1'));
    expect(props.onSelect).toHaveBeenCalled();
  });
});
