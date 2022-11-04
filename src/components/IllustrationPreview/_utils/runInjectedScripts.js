const runInjectedScripts = function runInjectedScripts(frame) {
  const cw = frame.current.contentWindow;
  const doc = cw.document;

  Promise.all(
    Array.from(doc.querySelectorAll('script[src]'))
      .map((scriptNode) => new Promise((resolve, reject) => {
        const reInjectedScriptNode = doc.createElement('script');
        doc.body.appendChild(reInjectedScriptNode);

        reInjectedScriptNode.onload = () => {
          resolve();
        };

        reInjectedScriptNode.onerror = (err) => {
          reject(err);
        };

        reInjectedScriptNode.setAttribute('src', scriptNode.src);

        scriptNode.parentNode.removeChild(scriptNode);
      })),
  ).then(() => {
    Array.from(doc.querySelectorAll('script:not([src])')).forEach((script) => {
      cw.eval(script.textContent);
    });
  })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err);
    });
};

export default runInjectedScripts;
