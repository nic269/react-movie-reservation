import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import _debounce from 'lodash/debounce';

// Components, Containers, HOCs
import SeatLayout from 'components/SeatLayout';

// Utils
import { SEAT_TYPE, MOCK_SERVER_RESPONSE } from 'utils/constants';
import createSeatMap from 'utils/create-seat-map/create-seat-map';

// Constants
import { MAX_SEAT_SELECT_INDICATOR } from './constants';
import styles from './index.scss';

const createSeatLayout = data => {
  const { maxSeatInARow, maxSeatInAColumn, config, reservedList } = data;
  const seatLayout = createSeatMap(maxSeatInARow, maxSeatInAColumn, config);
  reservedList.forEach(id => {
    const [rowName, ...seatNo] = id.split('');
    const row = rowName.charCodeAt(0) - 97;
    const seatNumRaw = +seatNo.join('') - 1;
    seatLayout[row].seats[seatNumRaw] = {
      ...seatLayout[row].seats[seatNumRaw],
      type: SEAT_TYPE.reserved,
    };
  });

  return seatLayout;
};

export function Room(props) {
  const [selectedIds, setSelectedId] = useState([]);
  const [selectedSeats, setSelectedSeat] = useState([]);
  const [zoomLevel, setZoomLevel] = useState(1);

  const zoomIn = _debounce(() => {
    if (zoomLevel >= 3) return;
    setZoomLevel(zoomLevel + 1);
  }, 200);

  const zoomOut = _debounce(() => {
    if (zoomLevel <= 1) return;
    setZoomLevel(zoomLevel - 1);
  }, 200);

  const onSelect = seat => {
    let updatedSelectedIds = [];
    let updatedSelectedSeats = [];
    if (selectedIds.includes(seat.id)) {
      updatedSelectedIds = selectedIds.filter(id => id !== seat.id);
      updatedSelectedSeats = selectedSeats.filter(item => item.id !== seat.id);
    } else {
      updatedSelectedIds = [...selectedIds, seat.id];
      updatedSelectedSeats = [...selectedSeats, seat];
    }
    if (updatedSelectedIds.length > MAX_SEAT_SELECT_INDICATOR) {
      updatedSelectedIds.shift();
      updatedSelectedSeats.shift();
    }
    setSelectedId(updatedSelectedIds);
    setSelectedSeat(updatedSelectedSeats);
    props.onSelect(seat, updatedSelectedSeats, updatedSelectedIds);
  };
  const seatLayout = createSeatLayout(MOCK_SERVER_RESPONSE.roomInfo);

  return (
    <>
      <div className={styles.zoomContainer}>
        <button type="button" onClick={zoomIn}>
          +
        </button>
        <span>{zoomLevel}x</span>
        <button type="button" onClick={zoomOut}>
          -
        </button>
      </div>
      <div className={styles.roomContainer}>
        <div
          className={cx(styles.roomWrapper, {
            [styles[`zoom${zoomLevel}x`]]: true,
          })}
        >
          <div className={styles.screen} />

          <SeatLayout
            seatLayout={seatLayout}
            selectedIds={selectedIds}
            seatPrice={MOCK_SERVER_RESPONSE.seatPrice}
            onSelect={onSelect}
          />
        </div>
      </div>
    </>
  );
}

Room.propTypes = {
  onSelect: PropTypes.func,
};

Room.defaultProps = {
  onSelect: () => {},
};

export default memo(Room);
