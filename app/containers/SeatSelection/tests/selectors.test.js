import makeSelectSelectedSeats, { selectSeatSelection } from '../selectors';
import { initialState } from '../reducer';

describe('selectSeatSelection', () => {
  it('should return initial state if store is not contain seatSelection', () => {
    expect(selectSeatSelection({})).toEqual(initialState);
  });

  it('should return seatSelection value', () => {
    const state = {
      seatSelection: {
        selectedSeats: [],
      },
    };
    const expectedResult = state.seatSelection;
    expect(selectSeatSelection(state)).toEqual(expectedResult);
  });
});

describe('makeSelectSelectedSeats', () => {
  it("should return default empty value of selected seats if it's not defined yet", () => {
    const state = {
      seatSelection: {
        selectedSeats: undefined,
      },
    };
    expect(makeSelectSelectedSeats()(state)).toEqual([]);
  });

  it('should return value of selected seats', () => {
    const state = {
      seatSelection: {
        selectedSeats: [{ id: 'a1' }],
      },
    };
    const expectedResult = state.seatSelection.selectedSeats;
    expect(makeSelectSelectedSeats()(state)).toEqual(expectedResult);
  });
});
