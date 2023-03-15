import { useCallback } from 'react';
import urlJoin from 'url-join';
import { readBinaryFile, readDir } from '@tauri-apps/api/fs';
import mime from 'mime/lite';
import atoms from '../atoms';
import s3 from '../utils/s3';

import {
  AWS_PRODUCTION_BUCKET,
} from '../constants/aws';
import {
  AI2HTML_OUTPUT_DIR,
  PUBLISH_EMBED_PATH,
} from '../constants/paths';

/**
 * Hook to set up a function for publishing a project
 * @function
 * @param {string} projectId - The ID of the project
 * @returns {function(): Promise}
 */
export default function usePublish(projectId) {
  const project = atoms.use.project(projectId);
  const { slug: projectSlug } = project;

  const illustrations = atoms.use.illustrationsInProject(projectId);
  const projectPath = atoms.use.projectPath(projectId);

  return useCallback(async () => {
    await Promise.all(
      illustrations.map(async (illo) => {
        const illoSlug = illo.slug;
        const generatedFieDir = urlJoin(
          projectPath,
          illoSlug,
          AI2HTML_OUTPUT_DIR,
        );
        const generatedFiles = await readDir(
          generatedFieDir, { recursive: true },
        );

        await Promise.all(
          generatedFiles.map(async (outputFile) => {
            const body = await readBinaryFile(outputFile.path);
            const contentType = mime.getType(outputFile.path);

            const key = urlJoin(
              PUBLISH_EMBED_PATH,
              projectSlug,
              illoSlug,
              outputFile.name,
            );

            await s3.upload({
              bucket: AWS_PRODUCTION_BUCKET,
              key,
              contentType,
              body,
            });
          }),
        );
      }),
    );
  }, [projectPath, projectSlug, illustrations]);
}
