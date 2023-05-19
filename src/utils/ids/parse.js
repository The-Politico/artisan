import delimeter from './delimeter';

export default function parse(id) {
  const [project, illustration] = id.split(delimeter);

  return {
    project,
    illustration,
  };
}
