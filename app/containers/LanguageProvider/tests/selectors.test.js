import { selectLanguage, makeSelectLocale } from '../selectors';
import { initialState } from '../reducer';

describe('selectLanguage', () => {
  it('should return initial state', () => {
    expect(selectLanguage({})).toEqual(initialState);
  });

  it('should select the global state', () => {
    const globalState = {};
    const mockedState = {
      language: globalState,
    };
    expect(selectLanguage(mockedState)).toEqual(globalState);
  });

  it('should select local from languge state', () => {
    const languageState = {
      locale: 'vn',
    };
    const mockedState = {
      language: languageState,
    };
    expect(makeSelectLocale()(mockedState)).toEqual(languageState.locale);
  });
});
