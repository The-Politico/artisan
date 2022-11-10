/**
 * Runs async functions in sequence
 * @param {Array<function(): Promise>} promises Array of functions
 * that return promises
 * @returns {Array<Promise>}
 */
export default async function runPromisesSequentially(promises) {
  if (promises.length === 0) return [];
  const [firstFunc, ...rest] = promises;
  return [await firstFunc(), ...(await runPromisesSequentially(rest))];
}
