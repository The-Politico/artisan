export default function isoToTime(iso) {
  const d = new Date(iso).getTime();

  if (Number.isNaN(d)) {
    return undefined;
  }

  return d;
}
