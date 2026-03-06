/**
 * Normalizes a string by converting it to lowercase and removing diacritics.
 * Essential for matching tank names that contains diacritics.
 * * @param {string} str - The raw string to be processed.
 * @returns {string} The normalized, lowercase string without accents.
 * * @example
 * normalizeString('Löwe') // returns 'lowe'
 */

export function normalizeString(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}
