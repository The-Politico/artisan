import store from '../../store';
import idToSlugs from '../ids/idToSlugs';

export default async function getLocalPreviewUrl() {
  const project = await store.preview.get('project');
  const port = await store.settings.get('preferred-port');

  const illoEntries = await store.entities.get();
  const illoIds = illoEntries
    .map(([id]) => id)
    .filter((id) => {
      const slugs = idToSlugs(id);
      return slugs.project === project;
    });

  const firstIllo = illoIds[0];
  const { illustration } = idToSlugs(firstIllo);

  return [
    `http://localhost:${port}`,
    illustration,
    'ai2html-output',
    `${illustration}.html`,
  ].join('/');
}
