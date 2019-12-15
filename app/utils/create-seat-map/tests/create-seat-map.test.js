import createSeatMap from '../create-seat-map';

describe('Utils: create-seat-map', () => {
  it('should create seat map without config', () => {
    const expectedResult = [
      {
        id: 'seat-row-a',
        name: 'a',
        seats: [
          { id: 'a1', type: 'std' },
          { id: 'a2', type: 'std' },
          { id: 'a3', type: 'std' },
          { id: 'a4', type: 'std' },
        ],
      },
      {
        id: 'seat-row-b',
        name: 'b',
        seats: [
          { id: 'b1', type: 'std' },
          { id: 'b2', type: 'std' },
          { id: 'b3', type: 'std' },
          { id: 'b4', type: 'std' },
        ],
      },
      {
        id: 'seat-row-c',
        name: 'c',
        seats: [
          { id: 'c1', type: 'std' },
          { id: 'c2', type: 'std' },
          { id: 'c3', type: 'std' },
          { id: 'c4', type: 'std' },
        ],
      },
      {
        id: 'seat-row-d',
        name: 'd',
        seats: [
          { id: 'd1', type: 'std' },
          { id: 'd2', type: 'std' },
          { id: 'd3', type: 'std' },
          { id: 'd4', type: 'std' },
        ],
      },
    ];

    expect(createSeatMap(3, 4)).toEqual(expectedResult);
  });

  it('should create seat map with config', () => {
    const config = {
      emptyList: ['a1', 'd4'],
      vipList: ['d3'],
      deluxeList: ['c4'],
      vipRow: ['c'],
      deluxeRow: ['d'],
    };
    const expectedResult = [
      {
        id: 'seat-row-a',
        name: 'a',
        seats: [
          { id: 'a1', type: 'emp' },
          { id: 'a2', type: 'std' },
          { id: 'a3', type: 'std' },
          { id: 'a4', type: 'std' },
        ],
      },
      {
        id: 'seat-row-b',
        name: 'b',
        seats: [
          { id: 'b1', type: 'std' },
          { id: 'b2', type: 'std' },
          { id: 'b3', type: 'std' },
          { id: 'b4', type: 'std' },
        ],
      },
      {
        id: 'seat-row-c',
        name: 'c',
        seats: [
          { id: 'c1', type: 'vip' },
          { id: 'c2', type: 'vip' },
          { id: 'c3', type: 'vip' },
          { id: 'c4', type: 'dlx' },
        ],
      },
      {
        id: 'seat-row-d',
        name: 'd',
        seats: [
          { id: 'd1', type: 'dlx' },
          { id: 'd2', type: 'dlx' },
          { id: 'd3', type: 'vip' },
          { id: 'd4', type: 'emp' },
        ],
      },
    ];

    expect(createSeatMap(3, 4, config)).toEqual(expectedResult);
  });
});
