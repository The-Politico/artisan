import { readDir, createDir, copyFile } from "@tauri-apps/api/fs";
import { documentDir, join } from "@tauri-apps/api/path";

import { addProject } from "../../store/operations/project-add";

export default async function DuplicateProject(originalProjectSlug, newProjectSlug) {
  
  const docsPath = await documentDir();
  const originalProjectPath = await join(docsPath, 'Artisan', 'Projects', originalProjectSlug); 
  const newProjectPath = await join(docsPath, 'Artisan', 'Projects', newProjectSlug); 
  await createDir(newProjectPath);

  const entries = await readDir(originalProjectPath, { recursive: true });
  
  for (let i=0; i < entries.length; i++){
    
    if ('children' in entries[i]){

      for (let j=0; j< entries[i].children.length; j++){

        if (entries[i].children[j].name.includes('.ai')){
          const illoSlug = entries[i].children[j].name.slice(0,-3); 
          const illoDir = await join(newProjectPath, illoSlug);
          await createDir(illoDir);
  
          const newFilePath = await join(illoDir, entries[i].children[j].name)
          copyFile(entries[i].children[j].path, newFilePath);
        }

      }
    }
  }

  addProject(newProjectSlug);
  
}