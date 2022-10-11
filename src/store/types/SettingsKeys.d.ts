export interface SettingsKeys {
  authorEmail: String;
  athorName: String;
  projectsFolder: String;
  hasAi2Html: Boolean;
  projects: String[];
}

export type Key = keyof SettingsKeys;
