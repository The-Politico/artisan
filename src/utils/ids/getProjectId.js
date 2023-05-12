import idToSlugs from './idToSlugs';

export default function getProjectId(id) {
  const slugs = idToSlugs(id);
  return slugs.project;
}
