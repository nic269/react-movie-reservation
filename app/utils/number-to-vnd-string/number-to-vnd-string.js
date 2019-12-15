import _isNumber from 'lodash/isNumber';

const numberToVNDString = value =>
  _isNumber(value)
    ? value.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
    : value;

export default numberToVNDString;
