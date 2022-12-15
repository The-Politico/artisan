import { basename } from '@tauri-apps/api/path';
import s3 from '../s3';
import { AWS_ARTISAN_BUCKET } from '../../constants/aws';

export async function fetchIlloMeta(key) {
  const {
    Metadata: { name },
  } = await s3.head({
    bucket: AWS_ARTISAN_BUCKET,
    key,
  });
  const slug = await basename(key, '.ai');
  return { name, slug };
}
