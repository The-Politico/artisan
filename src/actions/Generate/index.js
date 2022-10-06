import { Command } from '@tauri-apps/api/shell';
import { UseLoadAi2html } from '../hooks/UseLoadAi2html';

export default async function Generate(illustrationFilePath){

  const aiScript = UseLoadAi2html();

  if (aiScript){
    try {
      const scriptCommand = await new Command('run-osascript', 
        ['-e', 'tell application id "com.adobe.illustrator"','-e', 'activate','-e',`open POSIX file "${illustrationFilePath}" without dialogs`  
        ,'-e' , `do javascript file "${aiScript}"`, '-e', 'end tell']);

        scriptCommand.execute();

    } catch (error) {
      console.log(error);
    }
  }

}