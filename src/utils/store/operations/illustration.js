import { initStore } from '../init';

const store = initStore();

/**
 * Adds an illustration to a project with `publicURL` set to `null`.
 * @param {Object} opts
 * @param {String} opts.projectSlug Kebab-case project slug name
 * @param {String} opts.illustrationName Illustration display name
 * (e.g. "Illustration Name")
 * @returns
 */
export async function addIllustration({ projectSlug, illustrationName }) {
  const projectEntry = await store.get(projectSlug);

  if (projectEntry) {
    const { illustrations } = projectEntry;
    const slug = illustrationName.toLowerCase().replaceAll(' ', '-');

    const newIllustration = {
      name: illustrationName,
      slug,
      publicURL: null,
    };

    await store.set(projectSlug, {
      ...projectEntry,
      illustrations: [...illustrations, newIllustration],
    });

    return store.get(projectSlug);
  }
  return null;
}

/**
 * Updatesa an illustration's public URL field.
 * @param {String} projectSlug Kebab-case project slug name
 * @param {String} illustrationSlug Kebe-case illustration slug name
 * @param {String} publicURL Illustration's public URL once the project
 * has been published
 * @returns
 */
export async function updateIllustrationURL(
  projectSlug,
  illustrationSlug,
  publicURL,
) {
  const projectEntry = await store.get(projectSlug);

  if (projectEntry) {
    const { illustrations } = projectEntry;
    const illoMap = new Map(illustrations.map((d) => [d.slug, d]));
    const illoEntry = illoMap.get(illustrationSlug);

    if (!illoEntry) {
      throw new Error(`No such project exists for: ${illustrationSlug}`);
    }

    illoMap.set(illustrationSlug, {
      ...illoEntry,
      publicURL,
    });

    await store.set(projectSlug, {
      ...projectEntry,
      illustrations: [...illoMap.values()],
    });

    return store.get(projectSlug);
  }

  throw new Error(`No such project exists for: ${projectSlug}`);
}

/**
 * Removes an illustration from a project.
 * @param {String} projectSlug Kebab-case project slug name
 * @param {String} illustrationSlug Kebe-case illustration slug name
 * @returns
 */
export async function removeIllustration(projectSlug, illustrationSlug) {
  const projectEntry = await store.get(projectSlug);

  if (projectEntry) {
    const { illustrations } = projectEntry;
    const illoMap = new Map(illustrations.map((d) => [d.slug, d]));

    illoMap.delete(illustrationSlug);

    await store.set(projectSlug, {
      ...projectEntry,
      illustrations: [...illoMap.values()],
    });

    return store.get(projectSlug);
  }

  throw new Error(`No such project exists for: ${projectSlug}`);
}
