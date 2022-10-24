import { readDir } from '@tauri-apps/api/fs';

export default async function getFallbackPaths(illoPath) {
  const illoDirContents = await readDir(illoPath, { recursive: true });

  const fallbackImages = [];

  illoDirContents.forEach((content) => {
    if (content.children) {
      content.children.forEach((child) => {
        if (child.name.includes('fallback')) {
          fallbackImages.push(child.path);
        }
      });
    }
  });

  return fallbackImages;
}
