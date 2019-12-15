/**
 *
 * Tests for Room
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import 'jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router-dom';

import configureStore from '../../../configureStore';
import { Room } from '../index';

jest.mock('components/SeatLayout', () => 'mockedSeatLayout');
jest.mock('lodash/debounce', () => jest.fn(fn => fn));

describe('<Room />', () => {
  let store;
  let props;

  beforeAll(() => {
    props = {
      onSelect: jest.fn(),
    };
    store = configureStore({}, browserHistory);
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <Room {...props} />
      </Provider>,
    );
    expect(firstChild).toMatchSnapshot();
  });

  it('zoom in seat layout', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Room {...props} />
      </Provider>,
    );
    fireEvent.click(getByTestId('zoom-in'));
    expect(getByTestId('zoom-level')).toHaveTextContent('2x');
    fireEvent.click(getByTestId('zoom-in'));
    expect(getByTestId('zoom-level')).toHaveTextContent('3x');
    fireEvent.click(getByTestId('zoom-in'));
    expect(getByTestId('zoom-level')).toHaveTextContent('3x');
  });

  it('zoom out seat layout', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Room {...props} />
      </Provider>,
    );
    fireEvent.click(getByTestId('zoom-in'));
    expect(getByTestId('zoom-level')).toHaveTextContent('2x');
    fireEvent.click(getByTestId('zoom-out'));
    expect(getByTestId('zoom-level')).toHaveTextContent('1x');
    fireEvent.click(getByTestId('zoom-out'));
    expect(getByTestId('zoom-level')).toHaveTextContent('1x');
  });
});
