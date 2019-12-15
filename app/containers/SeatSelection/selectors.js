import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the seatSelection state domain
 */

const selectSeatSelection = state => state.seatSelection || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by SeatSelection
 */

const makeSelectSelectedSeats = () =>
  createSelector(
    selectSeatSelection,
    ({ selectedSeats }) => selectedSeats,
  );

export default makeSelectSelectedSeats;
export { selectSeatSelection };
