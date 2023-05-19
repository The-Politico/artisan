/**
 * Converts an ArrayBuffer of bytes to a base64 encoded string
 * @param {ArrayBuffer} bytes - The ArrayBuffer containing the bytes data
 * @returns {string} - The base64 encoded string
 */
export default function bytesToBase64(bytes) {
  return window.btoa(String.fromCharCode(...new Uint8Array(bytes)));
}
