import getIllosInProject from '../../utils/store/getIllosInProject';
import {
  STATUS_PROJECT_DRAFT,
  STATUS_PROJECT_PUBLISHED,
  STATUS_PROJECT_CHANGES,
  STATUS_UNKNOWN,
} from '../../constants/statuses';
import isoToTime from '../../utils/date/isoToTime';

export default async function getProjectStatus(projectId) {
  const illoEntries = await getIllosInProject(projectId);
  const illos = illoEntries.map(([, value]) => value);

  if (illos.length <= 0) {
    return STATUS_UNKNOWN;
  }

  // None of its illustrations have lastPublishedDate time
  if (illos.every((value) => value.lastPublishedDate === null)) {
    return STATUS_PROJECT_DRAFT;
  }

  // lastPublishedDate time after
  // the lastGenerated time for all it’s illustrations
  if (
    illos.every(
      (value) => isoToTime(value.lastPublishedDate)
        > isoToTime(value.lastGeneratedDate),
    )
  ) {
    return STATUS_PROJECT_PUBLISHED;
  }

  // lastPublishedDate time before the lastGenerated time in
  // at least one of its illustrations OR some illustrations
  // have lastPublishedDate while others don’t
  const testForSome = (d) => {
    const generatedAfterPub = isoToTime(d.lastGeneratedDate)
      > isoToTime(d.lastPublishedDate);
    const notPublished = d.lastPublishedDate === null;
    return generatedAfterPub || notPublished;
  };
  if (illos.some(testForSome)) {
    return STATUS_PROJECT_CHANGES;
  }

  return STATUS_UNKNOWN;
}
