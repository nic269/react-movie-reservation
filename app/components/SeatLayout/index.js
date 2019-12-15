import React, { memo } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import _upperCase from 'lodash/upperCase';
import _isArray from 'lodash/isArray';
import _get from 'lodash/get';

// Utils
import numberToVNDString from 'utils/number-to-vnd-string/number-to-vnd-string';
import { SEAT_TYPE } from 'utils/constants';

// Constants
import styles from './index.scss';

function SeatLayout(props) {
  const onSelect = seat => () => props.onSelect(seat);
  const { seatLayout, selectedIds, seatPrice } = props;
  return (
    <>
      <div className={styles.seatWrapper}>
        {_isArray(seatLayout) &&
          seatLayout.map(row => {
            const seats = _get(row, 'seats', []);
            const rowName = _get(row, 'name', '');
            const rowId = _get(row, 'id', '');

            return (
              <div className={styles.row} key={rowId}>
                <span className={styles.rowName}>{_upperCase(rowName)}</span>
                {seats.map((seat, idx) => {
                  const seatId = _get(seat, 'id', '');
                  const seatType = _get(seat, 'type', '');
                  const isDisabled =
                    seatType === SEAT_TYPE.empty ||
                    seatType === SEAT_TYPE.reserved;
                  const isSelected = selectedIds.includes(seatId);
                  const seatNo = idx + 1;

                  return (
                    <div
                      className={cx(styles.seat, {
                        [styles[seatType]]: true,
                        [styles.selected]: isSelected,
                      })}
                      disabled={isDisabled}
                      key={seatId}
                      onClick={isDisabled ? undefined : onSelect(seat)}
                      role="presentation"
                    >
                      {seatNo}
                    </div>
                  );
                })}
              </div>
            );
          })}
      </div>

      <div className={styles.instructions}>
        <div className={styles.instructionsStatus}>
          <div className={styles.instructionsRow}>
            <div
              className={cx(styles.seat, styles.rvd, styles.instructionsIcon)}
            />
            <span className={styles.instructionsText}>Đã đặt</span>
          </div>
          <div className={styles.instructionsRow}>
            <div
              className={cx(
                styles.seat,
                styles.selected,
                styles.instructionsIcon,
              )}
            />
            <span className={styles.instructionsText}>Đang chọn</span>
          </div>
        </div>
        <div className={styles.instructionsType}>
          {seatPrice[SEAT_TYPE.standard] && (
            <div className={styles.instructionsRow}>
              <div
                className={cx(styles.seat, styles.std, styles.instructionsIcon)}
              />
              <span className={styles.instructionsText}>
                Standard - {numberToVNDString(seatPrice[SEAT_TYPE.standard])}
              </span>
            </div>
          )}
          {seatPrice[SEAT_TYPE.vip] && (
            <div className={styles.instructionsRow}>
              <div
                className={cx(styles.seat, styles.vip, styles.instructionsIcon)}
              />
              <span className={styles.instructionsText}>
                VIP - {numberToVNDString(seatPrice[SEAT_TYPE.vip])}
              </span>
            </div>
          )}
          {seatPrice[SEAT_TYPE.deluxe] && (
            <div className={styles.instructionsRow}>
              <div
                className={cx(styles.seat, styles.dlx, styles.instructionsIcon)}
              />
              <span className={styles.instructionsText}>
                Deluxe - {numberToVNDString(seatPrice[SEAT_TYPE.deluxe])}
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

SeatLayout.propTypes = {
  seatLayout: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      seats: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          type: PropTypes.string,
        }),
      ),
    }),
  ),
  selectedIds: PropTypes.arrayOf(PropTypes.string),
  seatPrice: PropTypes.shape({
    [SEAT_TYPE.standard]: PropTypes.number,
    [SEAT_TYPE.vip]: PropTypes.number,
    [SEAT_TYPE.deluxe]: PropTypes.number,
  }),
  onSelect: PropTypes.func,
};

SeatLayout.defaultProps = {
  seatLayout: [],
  selectedIds: [],
  seatPrice: {},
  onSelect: () => {},
};

export default memo(SeatLayout);
