const TESTING_LOCATION = "artisan-test"
const SHARE_SUFFIX = "share"

export default function getSharePath(projectSlug){

  return `${[TESTING_LOCATION]}/${[projectSlug]}/${SHARE_SUFFIX}/`

}