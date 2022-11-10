import baseSlugify from 'slugify';

export default function slugify(text) {
  return baseSlugify(text, {
    replacement: '-',
    lower: true,
  });
}
