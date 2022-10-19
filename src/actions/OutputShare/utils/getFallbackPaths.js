import { readDir } from '@tauri-apps/api/fs';

export default async function getFallbackPaths(illoPath) {
  const illoDirContents = await readDir(illoPath, { recursive: true });

  const fallbackImages = [];

  await Promise.all(illoDirContents.map((content) => {
    if ('children' in content) {
      content.children.forEach((child) => {
        if (child.name.includes('fallback')) {
          fallbackImages.push(child.path);
        }
      });
    }

    return null;
  }));

  return fallbackImages;
}
