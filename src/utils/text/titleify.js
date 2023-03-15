import startCase from 'lodash/startCase';

/**
 * Returns a string with the first letter of each word capitalized.
 * @param {string} text - The string to be transformed.
 * @returns {string} - The transformed string.
 */
export default function titleify(text) {
  return startCase(text);
}
