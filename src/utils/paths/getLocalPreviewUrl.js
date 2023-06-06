import store from '../../store';

export default async function getLocalPreviewUrl(illoName) {
  const port = await store.settings.get('preferred-port');

  const illoURI = encodeURIComponent(illoName);
  const illoOutputDocument = illoName.replace(' ', '-');

  return [
    `http://localhost:${port}`,
    illoURI,
    'ai2html-output',
    `${illoOutputDocument}.html`,
  ].join('/');
}
