interface SettingsStore {
  'author-email': String;
  'athor-name': String;
  'working-directory': String;
  'preferred-port': String;
  projects: Array<ProjectDetails>;
  'first-run': Boolean;
}

interface IllustrationDetails {
  name: String;
  slug: String;
  publicURL: String;
}

/**
 * Expected return values when running `getProject()`
 */
export interface ProjectDetails {
  illustrations: Array<IllustrationDetails>;
  isPublished: Boolean;
  isUploaded: Boolean;
  lastUploaded: String;
  name: String;
  slug: String;
}
