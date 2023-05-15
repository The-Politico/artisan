import { formatDistanceToNow, isToday, format } from 'date-fns';
import {
  STATUS_PROJECT_ARCHIVED,
} from '../../constants/statuses';

export default function Timestamp({ status, timestamp }) {
  const capitalize = ([first, ...rest]) => first.toUpperCase() + rest.join('');

  const formatTime = () => {
    if (!status || status === STATUS_PROJECT_ARCHIVED || !timestamp) {
      return null;
    }

    const ts = new Date(timestamp);
    const isTodayResult = isToday(ts);
    if (!isTodayResult) {
      return format(ts, 'MMM d, y K:mmaaa');
    }
    return capitalize(formatDistanceToNow(ts, { addSuffix: true }));
  };

  return <span>{formatTime()}</span>;
}
