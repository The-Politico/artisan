import { removeFile } from "@tauri-apps/api/fs";
import { documentDir, join } from '@tauri-apps/api/path';


export default async function DeleteIllustration({illustrationFilePath}) {

  await removeFile(illustrationFilePath);

}