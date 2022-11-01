import { Command } from '@tauri-apps/api/shell';

import { join, documentDir, resolveResource } from '@tauri-apps/api/path';
import { UseLoadAi2html } from './_hooks/UseLoadAi2html'
import { UseLoadExportScript } from './_hooks/UseLoadExportScript';

export default async function Generate(projectSlug, illustrationSlug){

  const illoFile = illustrationSlug + ".ai"
  const docsPath = await documentDir();
  const illustrationFilePath = await join(docsPath, 'Artisan', 'Projects', projectSlug, illustrationSlug, illoFile);

  const aiScript = await resolveResource('ai2html.js');
  const exportScript = await resolveResource('exportArtboards.js');

  if (aiScript){

    console.log(exportScript);
    try {
      const scriptCommand = await new Command('run-osascript', 
        ['-e', 'tell application id "com.adobe.illustrator"','-e', 'activate','-e',`open POSIX file "${illustrationFilePath}" without dialogs`  
        ,'-e' , `do javascript file "${aiScript}"`, '-e', 'delay 6', '-e' , `do javascript file "${exportScript}"`, '-e', 'end tell']);

        scriptCommand.execute();

    } catch (error) {
      console.log(error);
    }
  }

  // if (exportScript){
  //   console.log(exportScript);
  //   try {

  //     const exportCommand = await new Command('run-osascript', 
  //       ['-e', 'tell application id "com.adobe.illustrator"','-e', 'activate','-e',`open POSIX file "${illustrationFilePath}" without dialogs`  
  //       ,'-e' , `do javascript file "${exportScript}"`, '-e', 'end tell']);

  //       exportCommand.execute();

  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

}