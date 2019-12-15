import produce from 'immer';
import { UPDATE_SEATS_RESERVATION } from './constants';

export const initialState = {
  selectedSeats: [],
};

/* eslint-disable default-case, no-param-reassign */
const seatSelectionReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case UPDATE_SEATS_RESERVATION:
        draft.selectedSeats = action.payload;
        break;
    }
  });

export default seatSelectionReducer;
