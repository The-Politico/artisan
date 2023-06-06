import { type } from '@tauri-apps/api/os';

let os = 'Darwin';
async function updateOS() {
  os = await type();
}
updateOS();

const JOIN_CHARACTER = {
  Linux: '/',
  Darwin: '/',
  Windows_NT: '\\',
};

/**
 * Joins multiple path segments into a single normalized path using the
 * appropriate path delimiter for the current operating system.
 *
 * @function
 * @param {...string} args - The path segments to join.
 *
 * @returns {string} - A normalized path with the appropriate delimiter
 * for the current operating system.
 */
export default function joinSync(...args) {
  const delimeter = JOIN_CHARACTER[os];
  const unnormalizedPath = args.join(delimeter);
  return unnormalizedPath.replaceAll(/[/|\\]{2,}/g, delimeter);
}
