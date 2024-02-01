/* eslint-disable import/extensions */
// eslint-disable-next-line import/no-extraneous-dependencies
import * as hermes from '@politico/hermes';
import fs from 'node:fs/promises';
import { AWS_STAGING_BUCKET } from '../constants/aws.js';
import {
  SHARE_PAGE_SCRIPTS,
  SHARE_PAGE_STYLES,
} from '../constants/paths.js';

(async function publish() {
  const s3 = await hermes.clients.aws.s3();

  const bundle = await fs.readFile(
    `${process.cwd()}/public/share/bundle.iife.js`,
    'utf-8',
  );

  const styles = await fs.readFile(
    `${process.cwd()}/public/share/style.css`,
    'utf-8',
  );

  await s3.upload({
    bucket: AWS_STAGING_BUCKET,
    key: SHARE_PAGE_SCRIPTS.split('?')[0],
    body: bundle,
    contentType: 'text/javascript',
    cacheControl: 'max-age=300',
    StorageClass: 'STANDARD',
  });

  await s3.upload({
    bucket: AWS_STAGING_BUCKET,
    key: SHARE_PAGE_STYLES.split('?')[0],
    body: styles,
    contentType: 'text/css',
    cacheControl: 'max-age=300',
    StorageClass: 'STANDARD',
  });
}());
