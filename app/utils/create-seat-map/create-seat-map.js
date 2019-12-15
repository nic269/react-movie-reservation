import { SEAT_TYPE } from '../constants';

const createSeatMap = (maxSeatInARow, maxSeatInAColumn, config = {}) => {
  const {
    emptyList = [],
    vipList = [],
    deluxeList = [],
    vipRow = [],
    deluxeRow = [],
  } = config;
  const seatMap = [];

  for (let i = 0; i <= maxSeatInARow; i += 1) {
    const seats = [];
    const rowStr = (i + 10).toString(36);
    const isVipRow = vipRow.includes(rowStr);
    const isDeluxeRow = deluxeRow.includes(rowStr);

    for (let j = 0; j < maxSeatInAColumn; j += 1) {
      const seatNo = j + 1;
      const id = `${rowStr}${seatNo}`;
      let type = SEAT_TYPE.standard;

      if (isVipRow) {
        type = SEAT_TYPE.vip;
      } else if (isDeluxeRow) {
        type = SEAT_TYPE.deluxe;
      }

      /* These conditions are custom purpose */
      if (emptyList.includes(id)) {
        type = SEAT_TYPE.empty;
      } else if (vipList.includes(id)) {
        type = SEAT_TYPE.vip;
      } else if (deluxeList.includes(id)) {
        type = SEAT_TYPE.deluxe;
      }

      seats.push({
        id,
        type,
      });
    }
    seatMap.push({
      id: `seat-row-${rowStr}`,
      name: rowStr,
      seats,
    });
  }

  return seatMap;
};

export default createSeatMap;
