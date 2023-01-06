const runInjectedScripts = async function runInjectedScripts(frame) {
  const cw = frame.current.contentWindow;
  const doc = cw.document;

  try {
    await Promise.all(
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
    );
  } catch (err) {
    console.error(err);
  }

  Array.from(doc.querySelectorAll('script:not([src])')).forEach((script) => {
    try {
      cw.eval(script.textContent);
    } catch (error) {
      console.error('Script failed to run.', script.textContent);
    }
  });
};

export default runInjectedScripts;
