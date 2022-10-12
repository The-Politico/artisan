const BASE_URL = "https://int-staging.politico.com/artisan-test";
const SHARE_SUFFIX = "share"

export default function getSharePath(projectSlug){

  return `${BASE_URL}/${[projectSlug]}/${SHARE_SUFFIX}/`

}