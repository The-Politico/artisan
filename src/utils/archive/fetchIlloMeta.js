import { basename } from '@tauri-apps/api/path';
import s3 from '../s3';
import { AWS_ARTISAN_BUCKET } from '../../constants/aws';

async function getMeta(key) {
  const {
    Metadata,
  } = await s3.head({
    bucket: AWS_ARTISAN_BUCKET,
    key,
  });
  const slug = await basename(key, '.ai');
  return { name: Metadata.name, slug, publicUrl: Metadata.publicurl };
}

export async function fetchIlloMeta(illosList) {
  const { Contents: list } = illosList;
  const keys = list.filter(({ Key }) => Key.includes('.ai')).map((x) => x.Key);
  return Promise.all(keys.map(getMeta));
}
