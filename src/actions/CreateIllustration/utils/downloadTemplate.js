import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { join, documentDir } from '@tauri-apps/api/path';

export default async function downloadTemplate() {

  const config = {
    region: 'us-east-1',
    credentials: {
      accessKeyId: import.meta.env.VITE_AWS_KEY_ID,
      secretAccessKey: import.meta.env.VITE_AWS_SECRET_KEY,
    },
  };

  const resource = {
    Bucket: import.meta.env.VITE_AWS_STAGING_BUCKET,
    Key: "artisan-test/templates/base.ai",
  };

  try {

    const docsPath = await documentDir();
    const templateFile = await join(docsPath, 'Artisan', 'Projects', 'template.ai');
  
    const s3Client = new S3Client(config);
    const command = new GetObjectCommand(resource);
    const response = await s3Client.send(command);

    
    const reader = response.Body.getReader()
    const result = await reader.read()
  
    return result.value;

  } catch (error) {
    console.log(error);
  }

}