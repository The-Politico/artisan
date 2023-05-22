import delimeter from './delimeter';

export default function gen({ project, illustration }) {
  return `${project}${delimeter}${illustration}`;
}
