/* eslint-disable import/extensions */
import { loadConfig } from '@aws-sdk/node-config-provider';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import fs from 'node:fs/promises';
import { AWS_STAGING_BUCKET } from '../constants/aws.js';
import {
  SHARE_PAGE_SCRIPTS,
  SHARE_PAGE_STYLES,
} from '../constants/paths.js';

(async function publish() {
  const getCredentials = await loadConfig(
    {
      configFileSelector: (profile) => ({
        accessKeyId: profile.aws_access_key_id,
        secretAccessKey: profile.aws_secret_access_key,
      }),
    },
    { profile: 'publishing' },
  );

  const credentials = await getCredentials();

  const s3Client = new S3Client({
    region: 'us-east-1',
    credentials,
  });

  const sharedCommand = {
    Bucket: AWS_STAGING_BUCKET,
    StorageClass: 'STANDARD',
  };

  const bundle = await fs.readFile(
    `${process.cwd()}/public/share/bundle.iife.js`,
    'utf-8',
  );

  const styles = await fs.readFile(
    `${process.cwd()}/public/share/style.css`,
    'utf-8',
  );

  const uploadBundleCommand = new PutObjectCommand({
    Key: SHARE_PAGE_SCRIPTS.split('?')[0],
    Body: bundle,
    ContentType: 'text/javascript',
    CacheControl: 'max-age=300',
    ...sharedCommand,
  });

  const uploadStylesCommand = new PutObjectCommand({
    Key: SHARE_PAGE_STYLES.split('?')[0],
    Body: styles,
    ContentType: 'text/css',
    CacheControl: 'max-age=300',
    ...sharedCommand,
  });

  await s3Client.send(uploadBundleCommand);
  await s3Client.send(uploadStylesCommand);
}());
