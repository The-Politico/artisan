export const BOX_BASE_API = 'https://api.box.com/2.0';
export const BOX_FOLDER_API = (folderId) => `${BOX_BASE_API}/folders/${folderId}`;
export const BOX_LIST_FOLDERS_API = (folderId) => `${BOX_FOLDER_API(folderId)}/items`;
export const BOX_LOCK_FOLDER = `${BOX_BASE_API}/folder_locks`;

export const PROJECTS_FOLDER_ID_DEV = '210417182704';
