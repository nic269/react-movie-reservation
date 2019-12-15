export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
export const DAEMON = '@@saga-injector/daemon';
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';
export const SEAT_TYPE = {
  standard: 'std',
  vip: 'vip',
  deluxe: 'dlx',
  empty: 'emp',
  reserved: 'rvd',
};
export const MOCK_SERVER_RESPONSE = {
  roomInfo: {
    maxSeatInARow: 11,
    maxSeatInAColumn: 14,
    config: {
      emptyList: [
        'a13',
        'a14',
        'c1',
        'c14',
        'd13',
        'd14',
        'e14',
        'f14',
        'g14',
        'h14',
        'i14',
        'j14',
        'k1',
        'k12',
        'k13',
        'k14',
        'l12',
        'l13',
        'l14',
      ],
      vipRow: ['e', 'f', 'g', 'h', 'i', 'j', 'k'],
      deluxeRow: ['l'],
    },
    reservedList: [
      'f7',
      'g1',
      'g6',
      'g7',
      'g8',
      'g9',
      'g10',
      'g11',
      'h7',
      'h8',
      'h9',
      'h10',
      'j4',
      'j5',
      'j6',
      'j7',
      'j8',
      'j9',
      'j10',
      'j11',
      'j12',
      'k6',
      'k7',
      'k8',
      'l6',
      'l7',
    ],
  },
  movieInfo: {
    title: 'Spider-man: Người nhện xa nhà',
    desc: ['C13', '2D Vietnam sub'],
  },
  cineInfo: {
    name: 'CGV Crescent Mall',
    startTime: '09:10',
    endTime: '11:10',
    date: '08/07/2019',
  },
  seatPrice: {
    [SEAT_TYPE.standard]: 60000,
    [SEAT_TYPE.vip]: 90000,
    [SEAT_TYPE.deluxe]: 110000,
  },
};
