/* eslint-disable import/prefer-default-export */
import { ListObjectsCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { readBinaryFile } from '@tauri-apps/api/fs';
import { join, homeDir, basename } from '@tauri-apps/api/path';

/**
 * @param {String} projectName Project name for directory
 * @param {String[]} files Adobe Illustartor file names
 */
async function backupFilesS3({ project, files }) {
  const homeDirPath = await homeDir();
  const s3 = new S3Client({
    region: 'us-east-1',
    credentials: {
      accessKeyId: '',
      secretAccessKey: '',
    },
  });

  const handleUpload = async (file) => {
    const keyPath = await join(project, file);
    const path = await join(homeDirPath, 'Artisan/Projects', keyPath);
    // const content = await readBinaryFile(path);
    console.log('Clicked: ', path, keyPath);

    try {

      /**
       * @type {import('@aws-sdk/client-s3').PutObjectCommandInput}
       */
      const params = {
        Bucket: '',
        Body: 'Hello world',
        Key: ``,
        ContentType: 'application/octect',
      };
      const uploadCommand = new PutObjectCommand(params);
      await s3.send(uploadCommand);
      // const s3Upload = new Upload({
      //   client: s3,
      //   params,
      // });

      // s3Upload.on('httpUploadProgress', (progress) => {
      //   console.log(progress);
      // });

      // await s3Upload.done();
    } catch (error) {
      console.error(error);
    }
  };

  try {
    await Promise.all(files.map(handleUpload));
  } catch (error) {
    console.error(error);
  }
}

export { backupFilesS3 };
