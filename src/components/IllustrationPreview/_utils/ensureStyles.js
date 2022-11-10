const ensureStyles = function ensureStyles(frame) {
  const doc = frame.current.contentWindow.document;
  [
    'https://static.politico.com/resource/0000017e-7fd1-d4e5-adfe-7ff9f1280001/styleguide/assets/battletoads/css/shared--base.js.a721a78317a0f65befbae0d80a1cf867.gz.css',
    'https://static.politico.com/resource/0000017e-7fd1-d4e5-adfe-7ff9f1280001/styleguide/assets/battletoads/css/shared--header.js.fc4b5ba636efcf3dd3e7be40bc86dc1f.gz.css',
    'https://static.politico.com/resource/0000017e-7fd1-d4e5-adfe-7ff9f1280001/styleguide/assets/battletoads/css/shared--footer.js.32c02709d09d2108cd4f315c846e666d.gz.css',
    'https://static.politico.com/resource/0000017e-7fd1-d4e5-adfe-7ff9f1280001/styleguide/assets/battletoads/css/shared--article.js.fc4bebe451dc662e546f22ce4e798946.gz.css',
    'https://static.politico.com/resource/0000017e-7fd1-d4e5-adfe-7ff9f1280001/styleguide/assets/battletoads/css/shared--utility.js.ae674724dac481b43c3015f787aa93e9.gz.css',
  ].forEach((sheet) => {
    if (!doc.head.querySelector(`link[href="${sheet}"]`)) {
      const link = doc.createElement('link');
      link.rel = 'stylesheet';
      link.href = sheet;
      doc.head.appendChild(link);
    }
  });
};

export default ensureStyles;
