import shareVersion from '../share/version.mjs';

// Default output folder when an illustration is generated
export const AI2HTML_OUTPUT_DIR = 'ai2html-output';

// Directory on S3 where projects are stored
export const ARCHIVE_PROJECTS_DIRECTORY = 'projects';

// Directory on S3 where templates are stored
export const ARCHIVE_TEMPLATES_DIRECTORY = 'templates';

// Directory on S3 where previews are stored
export const ARCHIVE_PREVIEWS_DIRECTORY = 'previews';

// Directory on S3 where "trash" is stored
export const ARCHIVE_TRASH_DIRECTORY = 'trash';

// Directory on S3 where project's generated share pages are stored
export const PUBLISH_SHARE_PATH = 'interactives/artisan/share';

// Directory on S3 where published project's embeds are stored
export const PUBLISH_EMBED_PATH = 'interactives/artisan/embeds';

// Directory on local where projects are stored
export const LOCAL_PROJECTS_DIRECTORY = 'projects';

// Common prefix for share page assetts
export const SHARE_PAGE_ASSETS = 'interactives/artisan/common';

// Path to common share page's JS file
export const SHARE_PAGE_SCRIPTS = `${SHARE_PAGE_ASSETS}/bundle.js?v=${shareVersion}`;

// Path to common share page's CSS (styles) file
export const SHARE_PAGE_STYLES = `${SHARE_PAGE_ASSETS}/styles.css?v=${shareVersion}`;

// Fallback image name
export const FALLBACK_IMG_NAME = 'fallback.png';
