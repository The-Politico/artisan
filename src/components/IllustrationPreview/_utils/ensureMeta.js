const ensureMeta = function ensureMeta(frame) {
  const doc = frame.current.contentWindow.document;

  if (!doc.querySelector('meta[name="viewport"]')) {
    const viewport = doc.createElement('meta');
    viewport.setAttribute('name', 'viewport');
    viewport.setAttribute('content', 'width=device-width');
    doc.head.appendChild(viewport);
  }
};

export default ensureMeta;
