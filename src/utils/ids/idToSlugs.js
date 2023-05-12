import delimeter from './delimeter';

export default function idToSlugs(id) {
  const [project, illustration] = id.split(delimeter);

  return {
    project,
    illustration,
  };
}
