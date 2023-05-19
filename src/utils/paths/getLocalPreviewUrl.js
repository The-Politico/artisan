import store from '../../store';
import ids from '../ids';

export default async function getLocalPreviewUrl() {
  const project = await store.preview.get('project');
  const port = await store.settings.get('preferred-port');

  const illoEntries = await store.illustrations.get();
  const illoIds = illoEntries
    .map(([id]) => id)
    .filter((id) => {
      const { project: compareId } = ids.parse(id);
      return compareId === project;
    });

  const firstIllo = illoIds[0];
  const { illustration } = ids.parse(firstIllo);
  const illoURI = encodeURIComponent(illustration);
  const illoOutputDocument = illustration.replace(' ', '-');

  return [
    `http://localhost:${port}`,
    illoURI,
    'ai2html-output',
    `${illoOutputDocument}.html`,
  ].join('/');
}
