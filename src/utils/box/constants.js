export const BOX_BASE_API = 'https://api.box.com/2.0';
export const BOX_FOLDER_API = (folderId) => `${BOX_BASE_API}/folders/${folderId}`;
export const BOX_LIST_FOLDERS_API = (folderId) => `${BOX_FOLDER_API(folderId)}/items`;
