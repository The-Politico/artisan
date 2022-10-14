import { WebviewWindow } from "@tauri-apps/api/window";

import Generate from "../Generate";

export default async function Preview(){

  const webview = new WebviewWindow('my-label', {
    url: "src/actions/Preview/PreviewWindow/index.html"
  });
  webview.once('tauri://created', function () {
  // webview window successfully created
  });
  webview.once('tauri://error', function (e) {
  // an error happened creating the webview window
  });

}