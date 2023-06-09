export async function copyToClipboard(text, setCopied) {
  await window.navigator.clipboard.writeText(text);
  setCopied(true);
  setTimeout(() => {
    setCopied(false);
  }, 2000);
}
