/*
 *
 * SeatSelection actions
 *
 */

import { UPDATE_SEATS_RESERVATION } from './constants';

export function updateSeatsReservation(seats) {
  return {
    type: UPDATE_SEATS_RESERVATION,
    payload: seats,
  };
}
