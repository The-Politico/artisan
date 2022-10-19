import OutputShare from '../OutputShare';

export default async function Share(projectSlug) {
  const shareURL = await OutputShare(projectSlug);
  console.log(shareURL);
}
