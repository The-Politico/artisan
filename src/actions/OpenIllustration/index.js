import { Command } from '@tauri-apps/api/shell';

export default async function OpenIllustration(illustrationFilePath){

  try {
    const scriptCommand = await new Command('run-osascript', 
    ['-e', 'tell application id "com.adobe.illustrator"','-e', 'activate','-e',`open POSIX file "${illustrationFilePath}" without dialogs`  
    ,'-e', 'end tell']);

    scriptCommand.execute();
  } catch (error) {
    console.log(error);
  }

}