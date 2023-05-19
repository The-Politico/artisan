import { assertion } from '@recoiljs/refine';
/**
 * Function to create, throw, and check custom errors with a specific code.
 * @param {Object} options - The options
 * @param {string} options.code - An error code
 * @param {Function} options.template - The function that returns an
 *  error message based on incoming data.
 * @param {Array} options.params - Refine definitions for the parameters
 *  of the error's message
 *
 * @returns {Object} An object containing custom error methods
 */
export default function err({ code, template, params }) {
  /**
   * Create an error message based on the provided data.
   * @param {*} data - The data to pass into the template function
   * @returns {string} The error message
   */
  const msg = (data) => {
    assertion(params)(data);
    return template(data);
  };

  /**
   * Create a new custom error object with the provided data.
   * @param {*} data - The data to pass into the message
   * @returns {Error} A new custom error object
   * containing the error code and message.
   */
  const newError = (data) => {
    const errorMessage = msg(data);

    const e = new Error(errorMessage);
    e.code = code;

    return e;
  };

  /**
   * Throw a custom error created with the provided data.
   * @param {*} data - The data to pass into the error's message.
   * @throws {Error} The custom error
   */
  const throwError = (data) => {
    throw newError(data);
  };

  /**
   * Check if the provided error object's code matches the custom error's code.
   * @param {Error} e - The error object to test.
   * @returns {boolean} Whether the error object's code matches the custom
   * error's code
   */
  const is = (e) => {
    if (!e.code) {
      return false;
    }

    return e.code === code;
  };

  return {
    msg,
    new: newError,
    throw: throwError,
    is,
    code,
  };
}
