import { documentDir, join } from "@tauri-apps/api/path";
import { readDir } from "@tauri-apps/api/fs";

export default async function getFallbackPaths(illoPath){

  const illoDirContents = await readDir(illoPath, {recursive: true});

  const fallbackImages = [];

  for (let i = 0; i < illoDirContents.length; i++){
    if ('children' in illoDirContents[i]){
      illoDirContents[i]['children'].forEach((child) => {
        if (child.name.includes("fallback")){
          fallbackImages.push(child.path);
        }
      })
    }
  } 

  return fallbackImages;
}