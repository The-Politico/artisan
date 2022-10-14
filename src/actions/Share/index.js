import generateSharePage from "../OutputShare/utils/generateSharePage";
import uploadSharePage from "../OutputShare/utils/uploadSharePage";

import { WebviewWindow } from "@tauri-apps/api/window";

import OutputShare from "../OutputShare";

export default async function Share(projectSlug){

  // TICKET: Gets name of project, and generates final URL 
  // RK notes: output share has to do this anyway, I'm having it return the share URL
  const shareURL = await OutputShare(projectSlug); 

  // TICKET: Opens web browser tab for export share page
  // RK notes: Tauri web window as placeholder -- looking for the most kosher way to simply open a new browser tab
  const webview = new WebviewWindow('Share', {
    url: shareURL
  });
  webview.once('tauri://created', function () {
  // webview window successfully created
  });
  webview.once('tauri://error', function (e) {
  // an error happened creating the webview window
  });

  return
}