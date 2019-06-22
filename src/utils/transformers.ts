import { isNumeric } from 'validator';

/** Remove non-numeric characters from a string. */
export function sanitizeNumberString(str: string): string {
  const isClean = isNumeric(str, { no_symbols: true });
  return isClean ? str : str.trim().replace(/\D/g, '');
}
