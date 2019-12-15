import numberToVNDString from '../number-to-vnd-string';

describe('Utils: number-to-vnd-string', () => {
  it('should do nothing it input is not a number', () => {
    expect(numberToVNDString('testing')).toEqual('testing');
  });

  it('should return vnd format', () => {
    expect(numberToVNDString(200000)).toEqual('₫200,000');
  });
});
