import fetchProjectMeta from '../../utils/archive/fetchProjectMeta';
import store from '../../store';
import generateIllustration
  from '../../utils/illustrations/generateIllustration';

import onWriteAI from './onWriteAI';

export default async function onCreateAI({ projectSlug, illustrationSlug }) {
  console.log('Create Illo:', projectSlug, illustrationSlug);
  onWriteAI({ projectSlug, illustrationSlug });
  // await generateIllustration(projectSlug, illustrationSlug);

  // const projectMeta = await fetchProjectMeta(
  //   projectSlug, { skipIllustrations: true },
  // );

  // const { id, version } = projectMeta;

  // await store.entities.set(id, { version });

  // Do something
}
