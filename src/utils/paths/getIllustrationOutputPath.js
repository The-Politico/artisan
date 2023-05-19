import { resolve } from '@tauri-apps/api/path';
import { AI2HTML_OUTPUT_DIR } from '../../constants/paths';
import getIllustrationPath from './getIllustrationPath';

export default async function getIllustrationOutputPath(id) {
  const illustrationPath = await getIllustrationPath(id);

  return resolve(
    illustrationPath,
    AI2HTML_OUTPUT_DIR,
  );
}
