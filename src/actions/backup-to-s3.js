import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

/**
 * @param {String} projectName Project name for directory
 * @param {String[]} files Adobe Illustartor file names
 */
async function backupFilesS3(projectName, files) {
  const s3 = new S3Client({ region });

  const bucketName;

  const handleUpload = async (file) => {
    const key = `${projectName}/${file}`
    const params = {
      Body: fileContents,
      Bucket: bucket,
      Key: key,
      CacheControl: 'max-age=300',
      ContentType: contentType,
      StorageClass: 'STANDARD',
    };
    const putObject = new PutObjectCommand(params)
    return await s3.send(putObject)
  }

  try {
    return await Promise.all(files.map(async (file)))
  } catch (error) {
    console.error(error)
  }

}