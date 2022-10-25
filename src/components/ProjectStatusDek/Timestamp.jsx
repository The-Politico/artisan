import { formatDistanceToNow, isToday, format } from 'date-fns';
import BackupPrompt from './BackupPrompt';

export default function Timestamp({ status, timestamp, project }) {
  const capitalize = ([first, ...rest]) => first.toUpperCase() + rest.join('');

  const formatTime = () => {
    if (!status || status === 'archive') {
      return null;
    }
    const ts = new Date(timestamp);
    const isTodayResult = isToday(ts);
    if (!isTodayResult) {
      return format(ts, 'MMM d, y K:mmaaa');
    }
    return capitalize(formatDistanceToNow(ts, { addSuffix: true }));
  };

  if (!timestamp) {
    return <BackupPrompt project={project} />;
  }

  return <span>{formatTime()}</span>;
}
