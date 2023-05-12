import delimeter from './delimeter';

export default function slugsToId({ project, illustration }) {
  return `${project}${delimeter}${illustration}`;
}
