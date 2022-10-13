import { GetObjectCommand } from '@aws-sdk/client-s3';

/**
 *
 * @param {import('@aws-sdk/client-s3').S3Client} s3Client
 * @param {Object[]} files
 * @return {String} Project display name
 */
export async function fetchProjectMeta(s3Client, files) {
  const { key: projectNameFile } = files.find(
    ({ illoName }) => illoName === 'project-name.txt',
  );
  const getTextFile = new GetObjectCommand({
    Bucket: import.meta.env.VITE_AWS_BACKUP_BUCKET_NAME,
    Key: projectNameFile,
    ResponseContentType: 'text/plain',
  });

  const { Body } = await s3Client.send(getTextFile);
  // eslint-disable-next-line no-undef
  const res = new Response(Body);
  const projectName = await res.text();
  return projectName;
}
