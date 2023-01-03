import generateIllustration from '../actions/generateIllustration';

export default async function onWriteAI({ projectSlug, illustrationSlug }) {
  await generateIllustration(projectSlug, illustrationSlug);
}
