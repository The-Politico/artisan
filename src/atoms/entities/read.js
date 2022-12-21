import fetchProjectsArchive from '../../utils/archive/fetchProjectsArchive';

export default async function onReadEntities() {
  const test = await fetchProjectsArchive();

  console.log(test);

  return [
    'a', 'b',
  ];
}
