import head from './head';

/**
 * Checks if the given object exists by calling the head() function.
 * In case of any unknown error, the error is thrown.
 *
 * @param {Object} obj - The object to check for existence.
 * @param {string} obj.bucket - The name of the S3 bucket.
 * @param {string} obj.key - The key (path) of the file in the S3 bucket.
 *
 * @returns {Promise<boolean>} - A Promise resolving to true if the
 *  object exists, false otherwise.
 *
 * @throws {Error} - Throws the error if it's not a NotFound: UnknownError.
 */
export default async function exists(obj) {
  try {
    const headData = await head(obj);

    if (!headData) {
      return undefined;
    }

    return true;
  } catch (err) {
    if (err.toString() === 'NotFound: UnknownError') {
      return false;
    }

    throw err;
  }
}
