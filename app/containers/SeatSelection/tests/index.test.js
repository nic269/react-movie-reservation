import React from 'react';
import { render } from 'react-testing-library';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router-dom';
import 'jest-dom/extend-expect';

import configureStore from '../../../configureStore';
import { SeatSelection, mapDispatchToProps } from '../index';
import { updateSeatsReservation } from '../actions';
jest.mock('containers/Room/Loadable', () => 'MockedRoom');

describe('<SeatSelection />', () => {
  let store;
  let props;
  beforeAll(() => {
    props = {
      onSelectSeat: jest.fn(),
      selectedSeats: [
        { id: 'a1', type: 'std' },
        { id: 'c4', type: 'vip' },
        { id: 'd3', type: 'dlx' },
      ],
    };
    store = configureStore({}, browserHistory);
  });

  it('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <Provider store={store}>
        <SeatSelection {...props} />
      </Provider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});

describe('mapDispatchToProps', () => {
  it('should call getResult', () => {
    const dispatch = jest.fn();
    const result = mapDispatchToProps(dispatch);
    const seat = { id: 'd3', type: 'dlx' };
    const seats = [
      { id: 'a1', type: 'std' },
      { id: 'c4', type: 'vip' },
      { id: 'd3', type: 'dlx' },
    ];
    result.onSelectSeat(seat, seats);
    expect(dispatch).toHaveBeenCalledWith(updateSeatsReservation(seats));
  });
});
