/**
 * Normalizes a string by converting it to lowercase and removing diacritics.
 * Essential for matching tank names that contains diacritics.
 * @param {string} str - The raw string to be processed.
 * @returns {string} The normalized, lowercase string without accents.
 * @example
 * normalizeString('Löwe') // returns 'lowe'
 */

export function normalizeString(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

/**
 * Get an array of vissible page numbers
 * @param {number} totalPages - The number of all pages
 * @param {number} currentPage - Current page number
 * @returns {Array<number>} - The array of visible page numbers
 */

export const getPageNumbers = (totalPages: number, currentPage: number) => {
  const pages = [];
  const maxVisiblePages = 5;

  if (totalPages <= maxVisiblePages) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, currentPage + 2);

    if (start === 1) {
      end = 5;
    } else if (end === totalPages) {
      start = totalPages - 4;
    }

    for (let i = start; i <= end; i++) pages.push(i);
  }
  return pages;
};
