import delimeter from './delimeter';

export default function isProjectSlug(id) {
  return id.indexOf(delimeter) === -1;
}
