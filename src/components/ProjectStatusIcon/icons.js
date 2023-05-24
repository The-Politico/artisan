import {
  CheckCircleIcon,
  MinusCircleIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/20/solid';
import ArchiveIcon from './ArchiveIcon';

// TODO: Figure out what a published status is
// TODO: Look into these statuses, we may need more icons
// TODO: Better handle status unknown, it should be imported too
export const ICONS = {
  default: MinusCircleIcon,
  STATUS_PROJECT_PUBLISHED: CheckCircleIcon,
  STATUS_PROJECT_DRAFT: MinusCircleIcon,
  STATUS_PROJECT_CHANGES: ExclamationCircleIcon,
  STATUS_PROJECT_ARCHIVED: ArchiveIcon,
};
