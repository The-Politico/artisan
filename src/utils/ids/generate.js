import delimeter from './delimeter';

export default function generate({ project, illustration }) {
  return `${project}${delimeter}${illustration}`;
}
