export default function IlloImage({ url }) {
  if (!url) {
    return <div>Fallback</div>;
  }

  return <div>IlloImage</div>;
}
