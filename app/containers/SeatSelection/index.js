import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

// Components, HOCs
import Room from 'containers/Room/Loadable';

// Utils
import { useInjectReducer } from 'utils/injectReducer';
import numberToVNDString from 'utils/number-to-vnd-string/number-to-vnd-string';
import { MOCK_SERVER_RESPONSE } from 'utils/constants';

// Own
import makeSelectSelectedSeats from './selectors';
import reducer from './reducer';
import { updateSeatsReservation } from './actions';
import styles from './index.scss';

export function SeatSelection(props) {
  useInjectReducer({ key: 'seatSelection', reducer });
  const { movieInfo, cineInfo } = MOCK_SERVER_RESPONSE;
  const priceCalculator = () => {
    const { seatPrice } = MOCK_SERVER_RESPONSE;
    let amount = 0;
    props.selectedSeats.forEach(seat => {
      amount += seatPrice[seat.type];
    });

    return amount;
  };

  return (
    <>
      <Helmet>
        <title>Seat selection</title>
        <meta name="description" content="Movie seat selection" />
      </Helmet>
      <div className={styles.container}>
        <div className={styles.movieInfo}>
          <h1 className={styles.title}>{movieInfo.title}</h1>
          <p className={styles.desc}>{movieInfo.desc.join('|')}</p>
        </div>
        <Room onSelect={props.onSelectSeat} />
        <div className={styles.btBar}>
          <div className={styles.ticketInfo}>
            <div className={styles.cineInfo}>
              <h4>{cineInfo.name}</h4>
              <p>
                {cineInfo.startTime}~{cineInfo.endTime} | {cineInfo.date}
              </p>
            </div>
            <div className={styles.amount}>
              <span>{numberToVNDString(priceCalculator())}</span>
            </div>

            <button className={styles.primaryButton} type="button">
              Chọn combo
            </button>
            <button className={styles.primaryButton} type="button">
              Thanh toán
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

SeatSelection.propTypes = {
  onSelectSeat: PropTypes.func.isRequired,
  selectedSeats: PropTypes.arrayOf(PropTypes.shape({})),
};

SeatSelection.defaultProps = {
  selectedSeats: [],
};

const mapStateToProps = createStructuredSelector({
  selectedSeats: makeSelectSelectedSeats(),
});

function mapDispatchToProps(dispatch) {
  return {
    onSelectSeat: (seat, seats) => {
      dispatch(updateSeatsReservation(seats));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(SeatSelection);
