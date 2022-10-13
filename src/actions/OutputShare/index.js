import { writeTextFile, readDir, readBinaryFile } from "@tauri-apps/api/fs"; 
import { documentDir, join } from "@tauri-apps/api/path";
import { Children } from "react";
import getSharePath from './utils/getSharePath'
import { AWS_STAGING_BUCKET } from "../../constants/buckets";
import uploadS3Object from "./utils/upload-to-s3";

import getIlloPaths from "./utils/getIlloPaths";
import getFallbackPaths from "./utils/getFallbackPaths";

export default async function OutputShare(projectSlug){

  const illos = await getIlloPaths(projectSlug);

  const projectFallbacks = [];

  for (let i=0; i < illos.length; i++){
    const fallbacks = await getFallbackPaths(illos[i]);
    projectFallbacks.push(...fallbacks);
  }

  for (let i=0; i < projectFallbacks.length; i++){
    const imageContent = await readBinaryFile(projectFallbacks[i]);
    const regexFileName = /.*\/(.*)$/;
    const imageFile = regexFileName.exec(projectFallbacks[i])[1];

    const regexIlloSlug = /.*\/(.*)\/ai2html.*$/
    const illoSlug = regexIlloSlug.exec(projectFallbacks[i])[1];

    const imageDestKey = getSharePath(projectSlug) + illoSlug+ "/" + imageFile;
    // await uploadS3Object(AWS_STAGING_BUCKET, imageDestKey, sharePageHTML);
  }

  const shareKey = getSharePath(projectSlug) + "index.html"
  const shareURL = AWS_STAGING_BUCKET + "/" + shareKey;

  const sharePageHTML = `<!DOCTYPE html>
      <html>
      <title>${projectSlug}</title>
      <body>
      <p>Hello World! ${shareURL}</p>
      </body>
      </html>`;

  // we don't really need a local file in the future -- helpful for now for while we build out
  // what share page needs to look like. 
  const fileName = "share.html"
  const docsPath = await documentDir();
  const destination = await join(docsPath, 'Artisan', 'Projects', projectSlug, fileName);
  await writeTextFile(destination, sharePageHTML);

  // bucket, key including filename, file content
  // await uploadS3Object(AWS_STAGING_BUCKET, shareKey, sharePageHTML);
}