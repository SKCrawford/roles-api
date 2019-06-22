import { sanitizeNumberString } from './transformers';

describe('utils/isbn', () => {
  const alpha = 'abcde';
  const alphanumeric = 'abcde12345';
  const numeric = '12345';

  describe('sanitizeNumberString', () => {
    it('removes all chars if string is alpha-only', () => {
      const expected = '';
      const result = sanitizeNumberString(alpha);
      expect(result).toEqual(expected);
    });

    it('removes alpha chars if string is alphanumeric', () => {
      const expected = '12345';
      const result = sanitizeNumberString(alphanumeric);
      expect(result).toEqual(expected);
    });

    it('removes no chars if string is numeric', () => {
      const expected = '12345';
      const result = sanitizeNumberString(numeric);
      expect(result).toEqual(expected);
    });
  });
});
