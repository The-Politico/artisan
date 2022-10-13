import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

export default async function uploadS3Object(bucket, key, fileContents) {
  const s3 = new S3Client({
    region: 'us-east-1',
    credentials: {
      accessKeyId: import.meta.env.VITE_AWS_KEY_ID,
      secretAccessKey: import.meta.env.VITE_AWS_SECRET_KEY,
    },
  });

  const commandInput = {
    Bucket: bucket,
    Key: key,
    Body: fileContents

  }

  try {

    const command = new PutObjectCommand(commandInput);
    const response = await s3.send(command);

  } catch(error){
    console.log(error);
  }

}