import baseSlugify from 'slugify';

export default function slugify(text) {
  // TODO: Verify slug characters, like no slashes

  return baseSlugify(text, {
    replacement: '-',
    lower: true,
  });
}
