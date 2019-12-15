import produce from 'immer';
import seatSelectionReducer from '../reducer';
import { updateSeatsReservation } from '../actions';

/* eslint-disable default-case, no-param-reassign */
describe('seatSelectionReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      selectedSeats: [],
    };
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(seatSelectionReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the updateSeatsReservation action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.selectedSeats = [{ id: 'a1' }, { id: 'c4' }];
    });

    expect(
      seatSelectionReducer(
        state,
        updateSeatsReservation([{ id: 'a1' }, { id: 'c4' }]),
      ),
    ).toEqual(expectedResult);
  });
});
