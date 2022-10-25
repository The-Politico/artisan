import * as icons24 from '@heroicons/react/24/solid';
import * as icons20 from '@heroicons/react/20/solid';

export default function BaseIcon({ size = '20', iconName, className }) {
  const icons = [icons20, icons24];
  const IconComponent = icons[size === '20' ? 0 : 1][iconName];
  return <IconComponent className={className} />;
}
