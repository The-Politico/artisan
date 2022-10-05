import { initStore } from '../init';

const store = initStore();

export async function addIllustration(projectSlug, illustrationName) {
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