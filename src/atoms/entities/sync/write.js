export default async function onWriteEntities() {
  throw new Error('The entities atom is read-only.');
}
