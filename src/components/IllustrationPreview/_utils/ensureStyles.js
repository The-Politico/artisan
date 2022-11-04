const ensureStyles = function ensureStyles(frame) {
  const doc = frame.current.contentWindow.document;
  [
    'https://static3.politico.com/resource/assets/battletoads/css/shared--base.min.cc62bc586cca8c0f6659b3f17ed46eae.gz.css',
    'https://static3.politico.com/resource/assets/battletoads/css/shared--header.min.b7b4231d05cbf1fce18848b54ddd9031.gz.css',
    'https://static3.politico.com/resource/assets/battletoads/css/shared--footer.min.4e2b31ee297e14a89e4c233d57eb8645.gz.css',
    'https://static3.politico.com/resource/assets/battletoads/css/shared--article.min.2c0125c8d877a13ac6143c84408cf042.gz.css',
    'https://static3.politico.com/resource/assets/battletoads/css/shared--utility.min.e66df854ea12e9d55dd4732272b01497.gz.css',
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
