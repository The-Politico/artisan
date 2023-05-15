import {
  CheckCircleIcon,
  MinusCircleIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/20/solid';
import ArchiveIcon from './ArchiveIcon';

import {
  STATUS_PROJECT_OK,
  STATUS_PROJECT_NOT_GENERATED,
  STATUS_PROJECT_VALID_UPLOAD,
  STATUS_PROJECT_DOWNLOAD_AVAILABLE,
  STATUS_PROJECT_ARCHIVED,
  STATUS_PROJECT_MISMATCH,
} from '../../constants/statuses';

// TODO: Figure out what a published status is
// TODO: Look into these statuses, we may need more icons
// TODO: Better handle status unknown, it should be imported too
export const ICONS = {
  published: CheckCircleIcon,
  STATUS_UNKNOWN: CheckCircleIcon,
  [STATUS_PROJECT_ARCHIVED]: ArchiveIcon,
  [STATUS_PROJECT_OK]: MinusCircleIcon,
  [STATUS_PROJECT_NOT_GENERATED]: MinusCircleIcon,
  [STATUS_PROJECT_VALID_UPLOAD]: MinusCircleIcon,
  [STATUS_PROJECT_DOWNLOAD_AVAILABLE]: MinusCircleIcon,
  [STATUS_PROJECT_MISMATCH]: ExclamationCircleIcon,
};
