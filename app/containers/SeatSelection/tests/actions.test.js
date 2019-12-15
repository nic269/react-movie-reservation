import { updateSeatsReservation } from '../actions';
import { UPDATE_SEATS_RESERVATION } from '../constants';

describe('SeatSelection actions', () => {
  describe('Default Action', () => {
    it('has a type of UPDATE_SEATS_RESERVATION', () => {
      const expected = {
        type: UPDATE_SEATS_RESERVATION,
        payload: [],
      };
      expect(updateSeatsReservation([])).toEqual(expected);
    });
  });
});
