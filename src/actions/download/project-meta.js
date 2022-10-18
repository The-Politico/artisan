import { GetObjectCommand } from '@aws-sdk/client-s3';
import { AWS_BACKUP_BUCKET_NAME } from '../../constants/paths';
import { getS3Client } from '../../utils/s3-client';

/**
 * @param {Object[]} files Array of file names
 * @return {String} Project display name
 */
export async function fetchProjectMeta(files) {
  const { key: projectNameFile } = files.find(
    ({ illoName }) => illoName === 'project-name.txt',
  );
  const getTextFile = new GetObjectCommand({
    Bucket: AWS_BACKUP_BUCKET_NAME,
    Key: projectNameFile,
    ResponseContentType: 'text/plain',
  });

  const { Body } = await getS3Client.send(getTextFile);
  const res = new window.Response(Body);
  const projectName = await res.text();
  return projectName;
}
